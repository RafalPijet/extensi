import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Button, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';
import {useStyles, Props} from './InfoModalStyle';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

const InfoModal: React.FC<Props> = (props) => {
    const { 
        isOpen,
        isError,
        modalTitle,
        _id,
        name,
        surname,
        birthDate,
        email,
        gender,
         confirmHandling,
        errorContent
        } = props;
    const classes = useStyles();

    return (
        <Dialog
            classes={{
                paper: classes.root,
            }}
            open={isOpen}
            disableEscapeKeyDown
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-email"
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.textCenter}>
                { modalTitle }
            </DialogTitle>
            <DialogContent>
                { isError ? (
                    <>
                        <Typography>{errorContent}</Typography>
                    </>
                ) : (
                     <>
                        <Typography>_id: <span className={classes.data}>{_id}</span></Typography>
                        <Typography>name: <span className={classes.data}>{name !== undefined && name.length > 0 ? name : 'none'}</span></Typography>
                        <Typography>surname: <span className={classes.data}>{surname}</span></Typography>
                        <Typography>birthDate: <span className={classes.data}>{birthDate?.substring(0, 10)}</span></Typography>
                        <Typography>email: <span className={classes.data}>{email}</span></Typography>
                        <Typography>gender: <span className={classes.data}>{gender !== undefined && gender.length > 0 ? gender : 'none'}</span></Typography>
                    </>
                )}
            </DialogContent>
            <DialogActions className={classes.footer}>
                <Button
                variant="contained"
                color="primary"
                endIcon={<Done />}
                onClick={() => confirmHandling()}
                >
                    Try again
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoModal;