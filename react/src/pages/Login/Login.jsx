import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// components
import Spinner from '../../components/Spinner/Spinner';
import TextBox from '../../components/TextField'
import FormWrapper from '../../components/Form/FormWrapper';
import BtSubmit from '../../components/Buttons/BtSubmit';
// remove after containerizeing error code
import PropTypes from 'prop-types';
import useStyles from './Login.style'

function Login(props) {
    const classes = useStyles();

    const {
        onSubmit,
        form,
        isError, errMsg,
        isLoading
    } = props;  // from login wrapper

    return <FormWrapper
        // not sure if maxWidth affects anything
        title="Login" maxWidth="sm"
        icon={LockOutlinedIcon}
        onSubmit={onSubmit}
    >
        {/* textbox, submit */}
        <TextBox label="Email" value={form.email} onChange={form.onChangeEmail} />
        <TextBox label="Password" value={form.password} onChange={form.onChangePass} inputType="password" />
        <BtSubmit fullWidth={true} text="Log In" />

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
    </FormWrapper>;
};

// add proptypes
Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    form: PropTypes.exact({
        email: PropTypes.string,
        password: PropTypes.string,
        onChangeEmail: PropTypes.func,
        onChangePass: PropTypes.func,
    }).isRequired,
}


export default Login;
