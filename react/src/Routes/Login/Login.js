import React from 'react';  
import { Link } from 'react-router-dom';
import {
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './Login.style'
import Spinner from '../../Common/Spinner/Spinner';

function Login(props) {
    // style
    const classes = useStyles();

    const {
        onSubmit,
        email, emailHandler,
        password, passHandler,
        isError, errMsg,
        isLoading
    } = props;


    // useEffect(() => console.log(isLoading), [errMsg])
    // ----------------------------------------------------------
    return (
        <Container width="300px">
            <div className={classes.paper}>
                <Paper className={classes.innerPaper} elevation={3}>

                {/* avatar thing */}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                {/* form thing */}
                <Typography component="h1" variant="h4">Login</Typography>
                <form onSubmit={onSubmit}>
                    {/*  */}
                    <TextBox label="Email" value={email} onChange={emailHandler} />
                    <TextBox label="Password" value={password} onChange={passHandler} inputType="password"/>

                    {/* submit */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        > Log In </Button>
                

                    {/* OH YEASSSS */}
                    <div className={classes.error}> 
                        <Typography >{ (isError && !isLoading) ? errMsg : "" } </Typography>
                        {/* <CircularProgress color="secondary"/> */}
                        { isLoading ?  <Spinner width='60%'/> : <></> }
                    </div>

                
                {/* line and register link */}
                <hr className={classes.line}/>

                <Container maxWidth="xs">
                    <Link to="/register">
                        <Typography align="center"> Don't have an account? Register here </Typography>
                    </Link>
                </Container>
            </form>

            </Paper>
            </div>
        </Container>
    );
};

// move this into shared component
const TextBox = props => {
        const { label, value, onChange, inputType } = props;
    const  type = inputType || "text";

    return (
        <div className="form-group">

        <TextField 
            variant="outlined"
            margin="normal"
            required fullWidth
            label={label}
            type={type}
            onChange={onChange}
            value={value}
        />

        </div>
    )
}

export default Login;
