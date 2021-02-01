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
            // not sure if maxWidth affects anything
            title="Login" maxWidth="sm"
            icon={LockOutlinedIcon}
            onSubmit={onSubmit}
        >
            {/* text box */}
            <TextBox label="Email" value={email} onChange={emailHandler} />
            <TextBox label="Password" value={password} onChange={passHandler} inputType="password" />

            {/* button */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            > Log In </Button>

            {/* error msg */}
            <div className={classes.error}>
                <Typography >{(isError && !isLoading) ? errMsg : ""} </Typography>
                {isLoading ? <Spinner width='60%' /> : <></>}
            </div>

            {/* line seperator need spacing style*/}
            <hr style={{ margin: "1rem 2rem" }} />

            {/* link to register */}
            <Typography align="center">
                Don't have an account?
                &nbsp;<Link to="/register">Register here</Link>
            </Typography>
        </FormWrapper>
    )
};

export default Login;
