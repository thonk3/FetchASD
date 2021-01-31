import { Typography } from '@material-ui/core';
import React from 'react'
import NavLink from './NavLink'

const NotLoggedIn = () => 
    <>
        <NavLink dir='/login' label='login' />
        <Typography>|</Typography>
        <NavLink dir='/register' label='register' />
    </>


export default NotLoggedIn;