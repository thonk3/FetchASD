import React from 'react'

import Login from './Login'

const LoginWrapper = props => {
    const [state, setState] = React.useState({
        username: '',
        password: ''
    })

    // const handleUsername = text => {
    //     setState({ ...state, username: text });
    //     console.log(`user: ${state.username}`);
    // };

    // const handlePassword = text => {
    //     setState({ ...state, password: text });
    //     console.log(`pass: ${state.password}`);
    // };

    const handleTextChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
        console.log(`${e.target.name}: ${state.[e.target.name]}`);
    }

    const onSubmit = e => {
        e.preventDefault(); // just for testing
        console.log("user:", state.username);
        console.log("pass:", state.password);
    }

    return <Login
        onTextChange={handleTextChange}
        onSubmit={onSubmit}
        />
}

export default LoginWrapper