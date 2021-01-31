import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import token from '../../utils/token'


/* 
    Route wrapper that only allows 
    authenticated users with admin authorization

    redirect to previous page if not authorized
    redirect to login page if not logged in
*/

const AdminRoute = ({ component: Component, ...rest }) => {
    const { loggedIn } = useAuth();
    const isStaff = token().staff;

    return (
        <Route 
            {...rest}
            render={ props =>
                (loggedIn && isStaff) ?
                ( <Component {...props} /> )
                :
                (   // redirect to login or previous page
                    <Redirect 
                    to={{ 
                        pathname: "/", 
                        state: { referer: props.location } }}
                    />
                )
            }
        />
    )
}

export default AdminRoute;