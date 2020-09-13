import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../../Context/authContext';
import Login from './Login'
import { Redirect } from 'react-router-dom';

const LoginWrapper = props => {
    const [state, setState] = React.useState({
        username: '',
        password: ''
    })

    const [isError, setIsError] = useState(false);  // prop a better way
    const [isLoggedIn, setisLoggedIn] = useState(false); // maybe not needed?
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    // onTextChange
    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    // for redirect
    const referer = props.location.state.referer || '/';

    const onSubmit = e => {
        e.preventDefault();

        const payload = { email, password };
        axios.post('/api/auth/login', payload)
            .then(res => {
                if(res.status === 200) {
                    // save jwt token
                    setAuthTokens(res.data.payload.token);
                    setisLoggedIn(true);
                } else {
                    console.log("failed to log in");
                }
            })
            .catch(e => {
                console.log("uh oh something bad happened");
            });
    };

    // redirect to main or previous link
    if(isLoggedIn) {
        return <Redirect to={referer} />
    }

    return <Login
        email={email}
        emailHandler={handleEmail}
        password={password}
        passHandler={handlePassword}
        onSubmit={onSubmit}
        />
}

export default LoginWrapper