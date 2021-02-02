import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.secondary.light,
        overflow: 'hidden',
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    title: {
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.main,
        fontStyle: 'italic',
        fontWeight: theme.typography.fontWeightMedium,
    },
    number: {
        fontSize: 20,
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
        height: 55,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    bold: {
        fontWeight: theme.typography.fontWeightMedium,
    }
}));

export default useStyles;