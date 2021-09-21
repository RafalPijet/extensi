import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { UserGender } from '../../../globalTypes';

export interface Props {
    isOpen: boolean;
    isError: boolean;
    modalTitle: string;
    _id?: string;
    name?: string;
    surname?: string;
    birthDate?: string;
    email?: string;
    gender?: UserGender;
    errorContent?: string;
    confirmHandling: () => void
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    textCenter: {
        textAlign: 'center'
    },
    footer: {
        justifyContent: 'center !important'
    },
    data: {
        fontWeight: 600,
        color: theme.palette.success.light
    }
}))