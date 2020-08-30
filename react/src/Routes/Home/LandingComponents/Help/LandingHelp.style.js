import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    button: {
        border: '4px solid currentColor',
        borderRadius: 0,
        height: 'auto',
        padding: theme.spacing(2, 5),
    },
    subtitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    heartIcon: {
        width: 60,
    },
}));

export default useStyles;