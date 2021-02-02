import { makeStyles } from '@material-ui/core/styles'

// styling for Landing Hero

const backgroundImage = 'https://ruffinwranglers.com/wp-content/uploads/playing-puppies-790638_1920.jpg';

const useStyles = makeStyles((theme) => ({
    cBackground: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    cButton: {
        minWidth: 200,
        margin: 10,
    },
    cH5: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    cSubtitle: {
        marginTop: theme.spacing(2),
    },
    cWebTitle: {
        fontWeight: "bold",
        fontStyle: "italic",
    },

    wRoot: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
            minHeight: 500,
            maxHeight: 1300,
        },
    },
    wContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    wBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1,
    },
    wBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    },
}));

export default useStyles;