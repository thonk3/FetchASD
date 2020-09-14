import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../Context/authContext'

/* used by route that needs to be hidden behind authentication */
/* redirect to home page if not authenticated */

// may need to be change to function
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loggedIn } = useAuth();

    return (
        <Route 
            {...rest}
            render={ props =>
                loggedIn ?
                ( <Component {...props} /> )
                :
                (   // redirect to login or previous page
                    <Redirect 
                    to={{ 
                        pathname: "/login", 
                        state: { referer: props.location } }}
                    /> /* redirect if not auth */
                )
            }
        />
    )
}

export default PrivateRoute;