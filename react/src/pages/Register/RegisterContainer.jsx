import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'
import Register from './Register';

const RegisterContainer = props => {
    // hooks
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [suburb, setSuburb] = useState();
    const [postcode, setpostcode] = useState();

    // errors stuff
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState([]);
    const [regComplete, setRegComplete] = useState(false);

    // loggin context
    const { loggedIn } = useAuth();

    // on field change
    const onChangeFName = (e) => setFirstName(e.target.value);
    const onChangeLName = (e) => setLastName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePass = (e) => setPassword(e.target.value);
    const onChangePhone = (e) => setPhoneNumber(e.target.value);
    const onChangeSuburb = (e) => setSuburb(e.target.value);
    const onChangePostcode = (e) => setpostcode(e.target.value);

    // redirect to login after sign in

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            firstName, lastName, 
            email, password, 
            phoneNumber, suburb, postcode
        }
        axios.post('/api/auth/register', payload)
            .then(res => {
                setRegComplete(true);
            }).catch(error => {
                // console.log(error.response.data.error);
                setErrMsg(error.response.data.error);
                setIsError(true);
            }).then(() => setIsLoading(false));
    }

    // -------------------------------------------------------
    // containerize redirect??
    const referer = () => {
        if (props.location.state === undefined) return '/';
        return props.location.state.referer;
    }

    if (loggedIn) return <Redirect to={referer(props)} />

    if (regComplete) return <Redirect to='/login' />


    let form = {
        firstName, onChangeFName,
        lastName, onChangeLName,
        email, onChangeEmail,
        password, onChangePass,
        phoneNumber, onChangePhone,
        suburb, onChangeSuburb,
        postcode, onChangePostcode,
    }

    return (
        <Register
            form={form}
            submit={onSubmit}
            errMsg={errMsg} isError={isError}
            isLoading={isLoading}
        />
    )
}

export default RegisterContainer;