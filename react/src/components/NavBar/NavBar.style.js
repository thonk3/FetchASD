import { makeStyles } from '@material-ui/core/styles'

/* 
    Material ui styling for navbar
*/

const useStyles = makeStyles(theme => ({
    menuRoot: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuTitle: {
        flexGrow: 1,
    },
    menuLink: {
        color: '#fff !important' ,
    }
}));

export default useStyles;