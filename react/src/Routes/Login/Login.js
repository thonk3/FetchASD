import React from 'react';  
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'


const Login = props => {
    return (
        <>
            <Typography variant='h3'>Login Page</Typography>
            <form>
                <p>username</p>
                <p>password</p>
                <p>Button</p>
                <Link to="/register">
                    no account? register here
                </Link>
            </form>
        </>
    );
};

export default Login;
