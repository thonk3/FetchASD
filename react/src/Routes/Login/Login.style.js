import { makeStyles } from '@material-ui/core/styles'


// doing styling is trash
// idk what any of these means
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3, 5),
        // background: "#fafafa"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    line: {
        margin: theme.spacing(0, 2, 1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
        padding: theme.spacing(0.5)
    },
    avatar: {
        background: theme.palette.secondary.main,
        margin: theme.spacing(1)
    }
}));

export default useStyles;