import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));


export default function LayoutTextFields() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };


    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField className={classes.textField} id="standard-basic" label="Location" margin="normal"/>
            <TextField className={classes.textField} id="standard-basic" label="Breed" margin="normal"/>
            <FormControlLabel control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
            label="Male"/>
            <FormControlLabel control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="Female"/>
        </form>
    );

        }