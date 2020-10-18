import React from 'react';

import useStyles from '../Login/Login.style'
import { Link } from 'react-router-dom';
import { 
    Container,
    Paper,
    Avatar, Typography,
    TextField,
    Button,
    CircularProgress
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

/* 
    TODO:
    - Display error messages from the payload
    - split these into logic / style components
*/

const Register = props => {
    const { 
        firstName, onChangeFName,
        lastName, onChangeLName,
        email, onChangeEmail,
        password, onChangePassword,
        phoneNumber, onChangePhone,
        suburb, onChangeSuburb,
        postcode, onChangePostcode,
    } = props.form;
    const { 
        submit,
        errMsg, isError,
        isLoading
    } = props;
    
    // styling
    const classes = useStyles();



    // const [redirLogin, setRedirLogin] = useState(false);

    // redirect to login after sign in
    // if(redirLogin) return <Redirect to='/login' />

    return (
        <Container width="400px">
            <div className={classes.paper}>
                <Paper className={classes.innerPaper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">Register</Typography>

                    {/* form */}
                    <form onSubmit={submit}>
                        <TextBox label="First Name" value={firstName} onChange={onChangeFName} />
                        <TextBox label="Last Name" value={lastName} onChange={onChangeLName} />
                        <TextBox label="Email" value={email} onChange={onChangeEmail} />
                        <TextBox label="Password" value={password} onChange={onChangePassword} inputType="password"/>
                        <TextBox label="Phone" value={phoneNumber} onChange={onChangePhone} inputType="tel"/>
                        <TextBox label="Suburb" value={suburb} onChange={onChangeSuburb} />
                        <TextBox label="PostCode" value={postcode} onChange={onChangePostcode} />
                        
                        <Button
                            type="submit" fullWidth
                            variant="contained"
                            color="primary"
                            classname={classes.submit}
                            > Register </Button>
                        
                        <div className={classes.error}> 
                                { (isError && !isLoading) 
                                ?
                                    (typeof errMsg === "string")
                                    ?
                                    <Typography> {errMsg} </Typography>
                                    :
                                    <ul>
                                        {errMsg.map(err => <li><b>{err.param}: </b> {err.msg}</li>)}
                                    </ul>
                                : "" } 
                            { isLoading ? <CircularProgress color="secondary"/> : <></> }
                        </div>

                        <hr className={classes.line} />

                        <Container>
                            <Link to="/login">
                                <Typography>Have an account? Login Here</Typography>
                            </Link>
                        </Container>
                    </form>
                </Paper>
            </div>

        </Container>
    );
};

// component for input boxes
const TextBox = props => {
    const { label, value, onChange, inputType, } = props;
    const  type = inputType || "text";

    return (
        <div className="form-group">

        <TextField 
            variant="outlined"
            margin="normal"
            required fullWidth
            type={type}
            label={label}
            onChange={onChange}
            value={value}
        />
        </div>
    )
}

export default Register;