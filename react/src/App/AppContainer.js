/* 
    Wrapper for the logic for App Component
*/
import App from "./App";
import React, { useState } from 'react'

import { AuthContext } from '../Context/authContext'


function AppWrapper(props) {
    // TOKEN CONTEXT
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [ authTokens, setAuthTokens ] = useState(existingTokens);

    // LOGGED IN CONTEXT
    const [ loggedIn, setLoggedIn ] = useState(existingTokens != null);

    // set new tokens through context
    const setTokens = (token) => {
        localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token);
        console.log({'tk': (token === null)});
    }

    return (
        <AuthContext.Provider 
            value={{ 
                authTokens, setAuthTokens: setTokens,
                loggedIn, setLoggedIn,
                }}
        >   
            <App />
        </AuthContext.Provider>
    )
};

export default AppWrapper;