import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../../Context/authContext';
import Login from './Login'
import { Redirect } from 'react-router-dom';

function LoginWrapper(props) {

    const [isError, setIsError] = useState(false);  // do something with this
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // context
    const { setAuthTokens } = useAuth();
    const { loggedIn, setLoggedIn } = useAuth();

    // onTextChange
    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    // for redirect
    // let ref = props.location.state.referer;
    function referer() {
        if(props.location.state.referer === undefined)
            return '/'
        return props.location.state.referer;
    }
    // console.log('loggedin referer: ');
    // console.log(props.location.state.referer || '/');

    const onSubmit = e => {
        e.preventDefault();

        const payload = { email, password };
        axios.post('/api/auth/login', payload)
            .then(res => {
                if(res.status === 200) {
                    // save jwt token/ logged in status
                    setAuthTokens(res.data.payload.token);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            })
            .catch(e => {
                // do somethinng with this
                console.log("uh oh something bad happened:");
                setIsError(true);
            });
    };

    // redirect to main or previous link
    if(loggedIn) {
        console.log("redirecting to ", referer);
        return <Redirect to={referer()} />
    }

    return <Login
        email={email}
        emailHandler={handleEmail}
        password={password}
        passHandler={handlePassword}
        onSubmit={onSubmit}
        isError={isError}
        {...props}
        />
}

export default LoginWrapper