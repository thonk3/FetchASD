import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PropTypes from 'prop-types';
// comonents
import Spinner from '../../components/Spinner/Spinner';
import TextBox from '../../components/TextField'
import FormWrapper from '../../components/Form/FormWrapper';
import BtSubmit from '../../components/Buttons/BtSubmit';

import useStyles from '../Login/Login.style'

const Register = props => {
    const classes = useStyles();

    const {
        submit,
        errMsg, isError,
        isLoading,
        form
    } = props;

    return <FormWrapper
        title="Register" maxWidth="sm"
        icon={LockOutlinedIcon}
        onSubmit={submit}
    >
        <TextBox label="First Name" value={form.firstName} onChange={form.onChangeFName} />
        <TextBox label="Last Name" value={form.lastName} onChange={form.onChangeLName} />
        <TextBox label="Email" value={form.email} onChange={form.onChangeEmail} />
        <TextBox label="Password" value={form.password} onChange={form.onChangePassword} inputType="password" />
        <TextBox label="Phone" value={form.phoneNumber} onChange={form.onChangePhone} inputType="tel" />
        <TextBox label="Suburb" value={form.suburb} onChange={form.onChangeSuburb} />
        <TextBox label="PostCode" value={form.postcode} onChange={form.onChangePostcode} />
        <BtSubmit fullWidth={true} text="Register" isLoading={isLoading}/>

        {/* error msg */}
        <div className={classes.error}>
            {
                (isError && !isLoading) /* ==== if there is errormsg && not loading ==== */
                    ?
                    (typeof errMsg === "string") /* ---- if errMsg is a string ---- */
                        ?
                        <Typography> {errMsg} </Typography>
                        : /* ---- else it would be an array ---- */
                        <ul>
                            {errMsg.map(err => <li><b>{err.param}: </b> {err.msg}</li>)}
                        </ul>
                    : "" /* ================ else dont print anything ===================== */
            }

            {/* load spinner */}
            {isLoading ? <Spinner width='60%' /> : <></>}
        </div>

        {/* line seperator */}
        <hr style={{ margin: "1rem 2rem" }} />

        {/* link to login */}
        <Typography align="center">
            Have an account?
            &nbsp;<Link to="/login">Login Here</Link>
        </Typography>
    </FormWrapper>
};

// add prop types
Register.propTypes = {
    submit: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errMsg: PropTypes.oneOfType([
        PropTypes.string, PropTypes.array,
    ]),
    isLoading: PropTypes.bool,
    form: PropTypes.exact({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        phoneNumber: PropTypes.string,
        suburb: PropTypes.string,
        postcode: PropTypes.string,
        onChangeFName: PropTypes.func,
        onChangeLName: PropTypes.func,
        onChangePass: PropTypes.func,
        onChangeEmail: PropTypes.func,
        onChangePhone: PropTypes.func,
        onChangeSuburb: PropTypes.func,
        onChangePostcode: PropTypes.func,
    }).isRequired,
}

export default Register;