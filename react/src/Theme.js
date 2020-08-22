import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
    palette: {
        primary: { main: '#AF0202' },
        secondary: { main: '#FFB74D' },
        background: { default: '#FBF2F2' }
    },
    spacing: 16,
    typography: {
        fontSize: 16
    }
});

export default Theme;