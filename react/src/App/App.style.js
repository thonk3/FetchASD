import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    borderThing: {
        border: '1px solid red',
    }
}));

export default Styles;