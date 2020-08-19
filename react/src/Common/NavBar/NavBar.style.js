import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
    menuRoot: {
        flexGrow: 1,
        color: '#fff',
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

export default useStyle;