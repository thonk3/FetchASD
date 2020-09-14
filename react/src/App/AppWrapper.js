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


  // demo nonsense ===================================================
    const [ state, setState ] = useState({
        loggedIn: false,
        adminAuth: false,
        showDemo: true,
    });

    // for the toggle
    const handleLogToggle = (e) => {
        setState({ ...state, [e.target.name]: !state.[e.target.name] });
        // console.log('a')
    }

    const handleDemoToggle = (e) => {
        setState({ ...state, showDemo: false });
    }

    let passedIn = {
        state,
        setState,
        handleDemoToggle,
        handleLogToggle
    }
  // =================================================================



    return (
        <AuthContext.Provider 
            value={{ 
                authTokens, setAuthTokens: setTokens,
                loggedIn, setLoggedIn
                }}
        >   
            <App thing={passedIn} />
        </AuthContext.Provider>
    )
};

export default AppWrapper;