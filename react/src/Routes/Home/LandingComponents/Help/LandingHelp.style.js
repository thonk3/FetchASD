import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    button: {
        border: '4px solid currentColor',
        background: 'white',
        borderRadius: 0,
        height: 'auto',
        padding: theme.spacing(2, 4),
    },
    bold:{
        fontStyle:'italic',
        fontWeight: theme.typography.fontWeightBold,
    }
}));

export default useStyles;