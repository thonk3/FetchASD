import React from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Container,
    Button,
    Paper,
    Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Spinner from '../../components/Spinner/Spinner';
import TextBox from '../../components/TextField'
import useStyles from './Login.style'

import FormWrapper from '../../components/Form/FormWrapper';

function Login(props) {
    const classes = useStyles();

    const {
        onSubmit,
        email, emailHandler,
        password, passHandler,
        isError, errMsg,
        isLoading
    } = props;  // from login wrapper

    return (
        <FormWrapper 
            title="Login" maxWidth="lg"
            icon={LockOutlinedIcon}
        >
            {/* text box */}
            <TextBox style={{width:"40000px"}} label="Email" value={email} onChange={emailHandler} />
            <TextBox label="Password" value={password} onChange={passHandler} inputType="password" />
            {/* button */}
            {/* error msg */}
            {/* line seperator need spacing style*/}
            <hr style={{margin: "1rem 2rem"}} /> 
            {/* link to register */}
        </FormWrapper>
    )
    // useEffect(() => console.log(isLoading), [errMsg])
    // ----------------------------------------------------------
    return (
        <Container width="300px">
            {/* wrapper style */}
            {/* div to box? prob wont change much*/}
            <div className={classes.paper}>
            {/* wrapper style */}
                <Paper className={classes.innerPaper} elevation={3}>

                    {/* avatar thing */}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">Login</Typography>

                    {/* form thing */}
                    <form onSubmit={onSubmit}>
                        {/*  */}
                        <TextBox label="Email" value={email} onChange={emailHandler} />
                        <TextBox label="Password" value={password} onChange={passHandler} inputType="password" />

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
                            <Typography >{(isError && !isLoading) ? errMsg : ""} </Typography>
                            {/* <CircularProgress color="secondary"/> */}
                            {isLoading ? <Spinner width='60%' /> : <></>}
                        </div>


                        {/* line and register link */}
                        <hr className={classes.line} />

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

export default Login;
