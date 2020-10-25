import React from 'react';
import NavLink from './components/NavLink'
import NotLoggedIn from './components/NotLoggedIn'
import NavSeperator from './components/NavSeperator'
import NavPopper from './components/NavPopper'

import { useAuth } from '../../Context/authContext'
import { Redirect } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';
// import HomeIcon from '@material-ui/icons/Home';
import useStyles from './NavBar.style';

import token from '../../Helpers/token'


/* 
TODO
- clean up this mess
- move the popup menu in its own component
 */

const NavBar = props => {
    // add styling
    const classes = useStyles();
    const userAnchorRef = React.useRef(null);
    const adminAnchorRef = React.useRef(null);
    
    const { setAuthTokens, setLoggedIn } = useAuth();
    const { loggedIn } = useAuth();
    
    // drop down menu
    const [openUser, setOpenUser] = React.useState(false);
    const handleUserToggle = () => { setOpenUser((prevOpen) => !prevOpen); };

    const [openAdmin, setOpenAdmin] = React.useState(false);
    const handleAdminToggle = () => { setOpenAdmin((prevOpen) => !prevOpen); };

    // items for admin and user buttons drop down
    const userItems = [
        { link: "/myacc", display: "My Account"},
        { link: "/myacc/mypack", display: "My Pack"},
        { link: "/events", display: "Events"},
        { link: "/date", display: "My Date"},
        { link: "/inquiries", display: "My Inquiries"}
    ];

    const adminItems = [
        { link: "/admin/user_man", display: "User Management"},
        { link: "/admin/loc_man", display: "Location Management"},
        { link: "/admin/messages", display: "Inquiries"},
        { link: "/admin/logs", display: "Logs"},
    ]

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpenUser(false);
            setOpenAdmin(false);
        }
    }

    // log out button
    const logOut = () => {
        setOpenUser(false);
        setLoggedIn(null);
        setAuthTokens(null);
        return <Redirect to='/' />
    }

    // conditional rendering functions
    const adminButton = () => {
        if(token().staff)
            return <> 
                <NavSeperator />
                <Button className={classes.menuLink} ref={adminAnchorRef} onClick={handleAdminToggle}>
                    <Typography variant='h6'> Admin </Typography>
                </Button>

                <NavPopper 
                    open={openAdmin} setOpen={setOpenAdmin} logOut={false}
                    handleListKeyDown={handleListKeyDown}
                    anchorRef={userAnchorRef}
                    popperItems={adminItems} />
            </>
        
        return <></>
    }   

    // aight the popper thing could be BETTER
    // 
    return (
        <div className={classes.menuRoot}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant='h5' className={classes.menuTitle}><b>Fetch</b></Typography>

                    {   // setting nav links based on auth status
                        loggedIn ?
                        (   // logged in
                            <>
                                <NavLink dir='/' label='the kennel' />
                                { adminButton() } {/* admin only component */}
                                <NavSeperator />

                                <Button className={classes.menuLink} ref={userAnchorRef} onClick={handleUserToggle}>
                                    <Typography variant='h6'> ME </Typography>
                                </Button>

                                <NavPopper 
                                    open={openUser} setOpen={setOpenUser} logOut={true}
                                    logOutHandler={logOut}
                                    handleListKeyDown={handleListKeyDown}
                                    anchorRef={userAnchorRef}
                                    popperItems={userItems} />

                            </>
                        ) 
                        : 
                        ( <NotLoggedIn /> )  // not logged in nav
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
};


export default NavBar;