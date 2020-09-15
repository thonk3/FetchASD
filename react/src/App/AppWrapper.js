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
    console.log("Init logged state: ", loggedIn);

    // set new tokens through context
    const setTokens = (token) => {
        localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token);
        console.log({'tk': (token === null)});
    }

    // get user ID
    const parseToken = () => {
        try{
            return JSON.parse(atob(authTokens.split('.')[1]));
        } catch (e) {
            return null;
        } 
    }
    const getUserID = () => parseToken().id;
    const getUserEmail = () => parseToken().email;


    // demo nonsense ===================================================
    // slowly removing this bs
    const [admin, setAdmin] = useState(false);
    const [demoBorder, setDemoBorder] = useState(true)

    // for the toggle
    const toggleAdmin = e => setAdmin(!admin);
    const toggleBorder = (e) => setDemoBorder(false)

    let thing = {
        admin, toggleAdmin,
        demoBorder, toggleBorder,
    }
  // =================================================================



    return (
        <AuthContext.Provider 
            value={{ 
                authTokens, setAuthTokens: setTokens,
                loggedIn, setLoggedIn,
                getUserID, getUserEmail
                }}
        >   
            <App thing={thing} />
        </AuthContext.Provider>
    )
};

export default AppWrapper;