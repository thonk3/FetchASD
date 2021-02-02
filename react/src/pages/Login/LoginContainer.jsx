import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../../contexts/authContext';
import Login from './Login'
import { Redirect } from 'react-router-dom';

const LoginWrapper = (props) => {
    // hooks 
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setisLoading] = useState(false);

    // context
    const { setAuthTokens } = useAuth();
    const { loggedIn, setLoggedIn } = useAuth();

    // onTextChange
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePass = e => setPassword(e.target.value);

    // set redirecting path
    // should do the same for register
    const referer = (props) => {
        if (props.location.state === undefined)
            return '/'
        return props.location.state.referer;
    }

    // submittingg loging in form
    const onSubmit = e => {
        e.preventDefault();

        const payload = { email, password };
        setisLoading(true);
        axios.post('/api/auth/login', payload)
            .then(res => {
                setAuthTokens(res.data.payload.token);
                setLoggedIn(true);
            })
            .catch(e => {
                console.log("Login api call error");

                setErrMsg(e.response.data.error);
                setIsError(true);
            }).then(() => setisLoading(false));
    };

    // redirect to main or previous link
    // shoudl do the same for register
    if (loggedIn) return <Redirect to={referer(props)} />;

    let form = {
        email, onChangeEmail,
        password, onChangePass,
    }
    return <Login
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isError={isError} errMsg={errMsg}
    />
}

export default LoginWrapper