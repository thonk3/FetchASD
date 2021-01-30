import React from 'react'
import NavLink from './NavLink'
import NavSeperator from './NavSeperator'

const NotLoggedIn = () => 
    <>
        <NavLink dir='/login' label='login' />
        <NavSeperator />
        <NavLink dir='/register' label='register' />
    </>


export default NotLoggedIn;