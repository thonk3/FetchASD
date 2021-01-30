import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../../contexts/authContext';
import Login from './Login'
import { Redirect } from 'react-router-dom';

function LoginWrapper(props) {

    // hooks 
    const [isError, setIsError] = useState(false);
    const [ errMsg, setErrMsg ] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [isLoading, setisLoading] = useState(false);

    // context
    const { setAuthTokens } = useAuth();
    const { loggedIn, setLoggedIn } = useAuth();

    // onTextChange
    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    // set redirecting path
    // should do the same for register
    function referer() {
        if(props.location.state === undefined)
            return '/'
        return props.location.state.referer;
    }

    // submittingg loging in form
    const onSubmit = e => {
        e.preventDefault();

        const payload = { email, password };
        setisLoading(true)
        axios.post('/api/auth/login', payload)
            .then(res => {
                if(res.status === 200) { // save jwt token, is logged in context
                    setAuthTokens(res.data.payload.token);
                    setLoggedIn(true);
                } else { // set error message
                    setIsError(true);   // do something with this // account doesnt exist/ wrong password 
                }
            })
            .catch(e => {
                console.log("Something went wrong, please refresh your browser or contact support");

                setErrMsg(e.response.data.error);
                setIsError(true);
            }).then(() => setisLoading(false));
            // setLoggedIn(false)

    };

    // redirect to main or previous link
    // shoudl do the same for register
    if(loggedIn) {
        console.log("redirecting to ", referer);
        return <Redirect to={referer()} />
    }

    return <Login
        email={email} emailHandler={handleEmail}
        password={password} passHandler={handlePassword}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isError={isError} errMsg={errMsg}
        />
}

export default LoginWrapper