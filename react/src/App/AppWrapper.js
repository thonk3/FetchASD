/* 
    Wrapper for the logic for App Component
*/
import App from "./App";
import React, { useState } from 'react'

import { AuthContext } from '../Context/authContext'


function AppWrapper(props) {
    // parse token and hooks
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [ authTokens, setAuthTokens ] = useState(existingTokens);

    // set new tokens through context
    const setTokens = (token) => {
        localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token);
    }

  // demo nonsense ===================================================
  const [ state, setState ] = useState({
    loggedIn: false,
    adminAuth: false,
    showDemo: true,
  });

  const handleLogToggle = (e) => {
    setState({ ...state, [e.target.name]: !state.[e.target.name] });
    // console.log('a')
  }

  const handleDemoToggle = (e) => {
    setState({ ...state, showDemo: false });
  }

    let passedIn = {
        state,
        handleDemoToggle,
        handleLogToggle
    }

  // =================================================================



    return (
        <AuthContext.Provider 
            value={{ 
                authTokens, 
                setAuthTokens: setTokens,
                }}
        >
            <App thing={passedIn} />
        </AuthContext.Provider>
    )
};

export default AppWrapper;