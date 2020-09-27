import React from 'react';
import NavLink from './components/NavLink'
import { useAuth } from '../../Context/authContext'
import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Popper, Grow, Paper, ClickAwayListener, MenuItem, MenuList 
} from '@material-ui/core';
// import HomeIcon from '@material-ui/icons/Home';
import useStyles from './NavBar.style';

/* 
TODO
- clean up this mess
- move the popup menu in its own component
 */


const NavBar = props => {
    // add styling
    const classes = useStyles();

    // deconstructing props
    const { authState } = props;

    // feeeeek =================================================================
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const { setAuthTokens, setLoggedIn } = useAuth();

    const handleToggle = () => { setOpen((prevOpen) => !prevOpen); };

    // const handleClose = (event) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    //     setOpen(false);
    // };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

  // return focus to the button when we transitioned from !open -> open
/*     const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) anchorRef.current.focus();

        prevOpen.current = open;
    }, [open]); */

    const logOut = () => {
        setLoggedIn(null);
        setAuthTokens(null);
    }

    
    return (
        <div className={classes.menuRoot}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color='inherit' aria-label='menu'
                        >
                        <MenuIcon />
                    </IconButton> */}
                    
                    <Typography variant='h5' className={classes.menuTitle}><b>Fetch</b></Typography>

                    {   // setting nav links based on auth status
                        authState ?
                        (   // logged in
                            <>
                                <NavLink dir='/' label='the kennel' />
                                <Typography>|</Typography>
                                <Button className={classes.menuLink} ref={anchorRef} onClick={handleToggle}>
                                    <Typography variant='h6'> ME </Typography>
                                </Button>

                                {/* Move this popper class outside */}
                                <Popper open={open} anchorEl={anchorRef.current}
                                    /* role={undefined} */ transition disablePortal>
                                    {({ TransitionProps }) => {
                                        return (
                                        
                                        <Grow {...TransitionProps}

                                            /* style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }} */ >
                                            
                                            <Paper>
                                                <ClickAwayListener onClickAway={()=> setOpen(false)}>
                                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                        <Link to="/myacc/" >
                                                            <MenuItem onClick={() => setOpen(false)}>My Account</MenuItem>
                                                        </Link>
                                                        <Link to="/myacc/mypack" >
                                                            <MenuItem onClick={() => setOpen(false)}>My Pack</MenuItem>
                                                        </Link>
                                                        <Link to="/date" >
                                                            <MenuItem onClick={() => setOpen(false)}>My Dates</MenuItem>
                                                        </Link>
                                                        <MenuItem onClick={() => {setOpen(false); logOut()}}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}}
                                </Popper>
                            </>
                        ) 
                        : 
                        (   // not logged in
                            <>
                                <NavLink dir='/login' label='login' />
                                <Typography>|</Typography>
                                <NavLink dir='/register' label='register' />
                            </>
                        )
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
};



export default NavBar;