import React from 'react';
import { useAuth } from '../../contexts/authContext'
import { Redirect } from 'react-router-dom'
import token from '../../utils/tokenUtils'
// components
import NavLink from './NavLink'
import NotLoggedIn from './NotLoggedIn'
import NavPopper from './NavPopper'
// styling
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';
import useStyles from './NavBar.style';

/* 
TODO
- clean up this mess
- move the popup menu in its own component
 */

// --------------------------------------------------------------------------------
const NavBar = props => {
    // add styling
    const classes = useStyles()
    //  anchor for drop down popper
    const userAnchorRef = React.useRef(null);
    const adminAnchorRef = React.useRef(null);
    // authentication context
    const { setAuthTokens, setLoggedIn } = useAuth();
    const { loggedIn } = useAuth();
    // drop down menu
    const [openUser, setOpenUser] = React.useState(false);
    const handleUserToggle = () => { setOpenUser((prevOpen) => !prevOpen); };

    const [openAdmin, setOpenAdmin] = React.useState(false);
    const handleAdminToggle = () => { setOpenAdmin((prevOpen) => !prevOpen); };

    // items for admin and user buttons drop down
    const userItems = [
        { link: "/myacc", display: "My Account" },
        { link: "/myacc/mypack", display: "My Pack" },
        { link: "/events", display: "Events" },
        { link: "/date", display: "My Date" },
        { link: "/inquiries", display: "My Inquiries" }
    ];

    const adminItems = [
        { link: "/admin/user_man", display: "User Management" },
        { link: "/admin/loc_man", display: "Location Management" },
        { link: "/admin/messages", display: "Inquiries" },
    ]

    const handleListKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpenUser(false);
            setOpenAdmin(false);
        }
    }

    // log out and redirect to home screen
    const logOut = () => {
        setOpenUser(false);
        setLoggedIn(null);
        setAuthTokens(null);
        return <Redirect to='/' />
    }

    // --------------------------------------------------------------------------------
    // render admin dropdown if user is admin
    const renderAdminNav = () => {
        if (token.isStaff())
            return <>
                <Typography>|</Typography>
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

    // render nav for authenticated users
    const renderUserNav = () => {
        return <>
            <NavLink dir='/' label='the kennel' />
            { renderAdminNav()} {/* admin only component */}
            <Typography>|</Typography>

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
    }

    // render nav depending if user is authenticated or not
    const visibleNav = () => {
        if(loggedIn) return renderUserNav();
        else return <NotLoggedIn />
    }


    // --------------------------------------------------------------------------------
    return (
        <div className={classes.menuRoot}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant='h5' className={classes.menuTitle}><b>Fetch</b></Typography>

                    { visibleNav() }

                </Toolbar>
            </AppBar>
        </div>
    );
};


export default NavBar;