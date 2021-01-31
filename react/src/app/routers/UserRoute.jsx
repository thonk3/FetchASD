import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

/* 
    Route wrapper that only allows 
    authenticated users to access

    redirect to login page if not logged in
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loggedIn } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ?
                    (<Component {...props} />)
                    :
                    (   // redirect to login or previous page
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { referer: props.location }
                            }}
                        />
                    )
            }
        />
    )
}

export default PrivateRoute;