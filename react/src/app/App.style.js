import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
    navOffset: theme.mixins.toolbar,
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginBottom: theme.spacing(2),
        width: '100%'
    },
    footer: { //fixed footer
        padding: theme.spacing(2, 0),
        marginTop: 'auto',
        width: '100%',
        background: theme.palette.primary.main,
        color: '#fff',
        display: 'flex'
    },
}));

export default Styles;