
import App from "./App";
import React, { useState } from 'react'

import { AuthContext } from '../contexts/authContext'

/* 
    Wrapper for the logic for App Component

    sets up context provider for autherization status
*/

const AppWrapper = () => {
    // token context - empty string or token string
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [ authTokens, setAuthTokens ] = useState(existingTokens);
    // authentication state - booolean
    const [ loggedIn, setLoggedIn ] = useState(existingTokens != null);

    // set new token using context
    // used in Login and LogOut(nav)
    const setTokens = (token) => {
        localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token);
        // console.log({'tk': (token === null)});
    }

    return (
        <AuthContext.Provider 
            value={{ 
                authTokens, 
                setAuthTokens: setTokens,
                loggedIn, 
                setLoggedIn,
            }}
        >   
            <App />
        </AuthContext.Provider>
    )
};

export default AppWrapper;