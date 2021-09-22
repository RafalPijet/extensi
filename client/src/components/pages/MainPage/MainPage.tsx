import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Grid,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  InputAdornment,
  Switch,
  CircularProgress,
} from '@material-ui/core';
import { Edit, Done, Send } from '@material-ui/icons';
import CustomInput from '../../common/CustomInput/CustomInput';
import InfoModal from '../../common/InfoModal/InfoModal';
import {
  UserData,
  UserGender,
  eighteenYears,
  InfoModalData,
} from '../../../globalTypes';
import { calculateAge } from '../../../functions';
import { useStyles } from './MainPageStyle';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const currentlyDifferent = Date.now() - eighteenYears;
  let availableStartDate = new Date(currentlyDifferent).toLocaleDateString();
  availableStartDate = `${availableStartDate.substring(
    6,
    10
  )}-${availableStartDate.substring(3, 5)}-${availableStartDate.substring(
    0,
    2
  )}`;
  const [userData, setUserData] = useState<UserData>({
    name: '',
    surname: '',
    birthDate: availableStartDate,
    email: '',
    gender: UserGender.female,
  });
  const [modal, setModal] = useState<InfoModalData>({
    isOpen: false,
    isError: false,
    title: '',
    content: {},
  });
  const [isGender, setIsGender] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(true);
  const [isError, setIsError] = useState<
    Record<keyof Omit<UserData, 'name' | 'gender'>, boolean>
  >({
    surname: false,
    email: false,
    birthDate: false,
  });

  useEffect(() => {
    setIsError({
      ...isError,
      surname: userData.surname.length > 0 && userData.surname.length < 3,
      birthDate: calculateAge(userData.birthDate) < 18,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    setIsDisabled(
      !isError.birthDate &&
        !isError.email &&
        !isError.surname &&
        userData.surname.length > 0 &&
        userData.email.length > 0 &&
        !isAdding
    );
  }, [isError, userData.surname, userData.email, isAdding]);

  useEffect(() => {
    if (isReady && userData.email.length !== 0) {
      (async () => {
        try {
          setIsPending(true);
          const res: AxiosResponse = await axios.get(
            '/api/email-validator.php',
            {
              params: {
                email: userData.email,
              },
            }
          );
          setIsError({
            ...isError,
            email: !res.data.validation_status,
          });
          setIsPending(false);
        } catch (err: any) {
          setIsPending(false);
          setModal({
            isOpen: true,
            isError: true,
            title: 'Error',
            content: {
              errorContent: `Something went wrong, status: ${err.response.status} - ${err.response.statusText}`,
            },
          });
        }
      })();
    }
    if (userData.email.length === 0) {
      setIsReady(false);
      setIsError({
        ...isError,
        email: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.email]);

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isReady) setIsReady(true);
    if (!isPending) {
      setUserData({ ...userData, [event.target.id!]: event.target.value });
    }
  };

  const handleRadioBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      gender: event.target.value as UserGender,
    });
  };

  const switchIsEditHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsGender(e.target.checked);
  };

  const closeModalHandling = () => {
    setModal({
      isOpen: false,
      isError: false,
      title: '',
      content: {},
    });
    setUserData({
      name: '',
      surname: '',
      birthDate: availableStartDate,
      email: '',
      gender: UserGender.female,
    });
    if (isGender) setIsGender(false);
    setIsReady(false);
  };

  const sendDataHandling = async () => {
    let userDataToSend: UserData = userData;

    if (!isGender) userDataToSend.gender = UserGender.undefined;

    try {
      setIsAdding(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        userDataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data) {
        setModal({
          isOpen: true,
          isError: false,
          title: 'Successful adding user',
          content: {
            _id: res.data.newUser._id,
            name: res.data.newUser.name,
            surname: res.data.newUser.surname,
            birthDate: res.data.newUser.birthDate,
            email: res.data.newUser.email,
            gender: res.data.newUser.gender,
          },
        });
      }
      setIsAdding(false);
    } catch (err: any) {
      setModal({
        isOpen: true,
        isError: true,
        title: 'Error',
        content: {
          errorContent: err.response.data.message
            ? err.response.data.message
            : 'Something went wrong',
        },
      });
      if (isAdding) setIsAdding(false);
    }
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} lg={6} className={classes.dataForm}>
            <Typography variant="h6" style={{ width: 'fit-content' }}>
              Enter your data
            </Typography>
            <CustomInput
              labelText="Name"
              helperText=""
              id="name"
              value={userData.name}
              onChange={handleTextField}
              isDisabled={isAdding}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    <Done />
                  </InputAdornment>
                ),
              }}
              labelProps={{
                style: {
                  color: '#fff',
                },
              }}
            />
            <CustomInput
              labelText="Surname"
              helperText={isError.surname ? 'too short' : ''}
              id="surname"
              value={userData.surname}
              onChange={handleTextField}
              isDisabled={isAdding}
              error={isError.surname}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.surname && userData.surname.length > 0 ? (
                      <Done />
                    ) : (
                      <Edit />
                    )}
                  </InputAdornment>
                ),
              }}
              labelProps={{
                style: {
                  color: '#fff',
                },
              }}
            />
            <CustomInput
              labelText="Birth date"
              helperText={
                isError.birthDate ? 'you must be 18 years or older' : ''
              }
              id="birthDate"
              value={userData.birthDate}
              inputProps={{
                type: 'date',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.birthDate ? <Done /> : <Edit />}
                  </InputAdornment>
                ),
              }}
              labelProps={{
                style: {
                  color: '#fff',
                },
              }}
              onChange={handleTextField}
              isDisabled={isAdding}
              error={isError.birthDate}
              formControlProps={{
                fullWidth: true,
              }}
            />
            <CustomInput
              labelText="Email"
              helperText={isError.email ? 'email not valid' : ''}
              id="email"
              value={userData.email}
              inputProps={{
                type: 'email',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.email && userData.email.length > 0 ? (
                      <Done />
                    ) : (
                      <Edit />
                    )}
                  </InputAdornment>
                ),
              }}
              labelProps={{
                style: {
                  color: '#fff',
                },
              }}
              onChange={handleTextField}
              isDisabled={isAdding}
              error={isError.email}
              formControlProps={{
                fullWidth: true,
              }}
            />
            <RadioGroup
              value={userData.gender}
              onChange={handleRadioBox}
              className={classes.genderSelect}
            >
              <FormControlLabel
                value={isGender && UserGender.female}
                control={<Radio />}
                label="Female"
                disabled={!isGender || isAdding}
              />
              <FormControlLabel
                value={isGender && UserGender.male}
                control={<Radio />}
                label="Male"
                disabled={!isGender || isAdding}
              />
              <FormControlLabel
                control={
                  <Switch
                    disabled={isAdding}
                    checked={isGender}
                    onChange={switchIsEditHandling}
                  />
                }
                label="Set gender"
              />
            </RadioGroup>
            <Grid container style={{ minHeight: 50 }} alignItems="center">
              <Grid item xs={12} sm={12} lg={5} className={classes.progressBox}>
                {(isPending || isAdding) && <CircularProgress />}
              </Grid>
              <Grid item xs={12} sm={12} lg={7}>
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<Send />}
                  disabled={!isDisabled}
                  onClick={sendDataHandling}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <InfoModal
        isOpen={modal.isOpen}
        isError={modal.isError}
        modalTitle={modal.title}
        _id={modal.content._id}
        name={modal.content.name}
        surname={modal.content.surname}
        birthDate={modal.content.birthDate}
        email={modal.content.email}
        gender={modal.content.gender}
        errorContent={modal.content.errorContent}
        confirmHandling={closeModalHandling}
      />
    </div>
  );
};

export default MainPage;
