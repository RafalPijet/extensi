import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { container } from '../../../globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        padding: '20px 0',
        backgroundColor: theme.palette.background.default,
        ...container
    },
    root: {
        padding: 10,
        margin: 20,
        backgroundColor: theme.palette.grey[500]
    },
    dataForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    genderSelect: {
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'row'
    },
    progressBox: {
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 20
    }
}))