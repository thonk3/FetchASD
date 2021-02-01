import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import  Register from './Register';

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
    const [errMsg, setErrMsg ] = useState([]);
    const [redirLogin, setRedirLogin] = useState(false);

    // on field change
    const onChangeFName = (e) =>  setFirstName(e.target.value);
    const onChangeLName = (e) =>  setLastName(e.target.value);
    const onChangeEmail = (e) =>  setEmail(e.target.value);
    const onChangePassword = (e) =>  setPassword(e.target.value);
    const onChangePhone = (e) =>  setPhoneNumber(e.target.value);
    const onChangeSuburb = (e) =>  setSuburb(e.target.value);
    const onChangePostcode = (e) =>  setpostcode(e.target.value);

    // redirect to login after sign in
    if(redirLogin) return <Redirect to='/login' />


    const submit = (e) => {
        e.preventDefault();

        setTimeout(2000);

        const payload = {
            firstName, lastName, email, password, phoneNumber, suburb, postcode
        }

        console.log(payload)
        setIsLoading(true);
        axios.post('/api/auth/register', payload)
            .then(res => {
                if(res.status === 200) {
                    console.log("New User Created")
                    setRedirLogin(true);
                } else {    
                    console.log("Somthing went wrong");
                }
            }).catch(error => {
                console.log("uhoh ");
                console.log(error.response.data.error);
                setErrMsg(error.response.data.error);
                setIsError(true);

                // console.log(typeof errMsg);
            }).then(() => setIsLoading(false));
    }


    // -------------------------------------------------------
    let form = {
        firstName, onChangeFName,
        lastName, onChangeLName,
        email, onChangeEmail,
        password, onChangePassword,
        phoneNumber, onChangePhone,
        suburb, onChangeSuburb,
        postcode, onChangePostcode,
    }

    return (
        <Register 
            form={form}
            submit={submit}
            errMsg={errMsg} isError={isError}
            isLoading={isLoading}
        />
    )
}

export default RegisterContainer;