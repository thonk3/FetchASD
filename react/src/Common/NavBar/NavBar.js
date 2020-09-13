import React from 'react';
import NavLink from './components/NavLink'

import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';
// import HomeIcon from '@material-ui/icons/Home';
import useStyles from './NavBar.style';

const NavBar = props => {
    // add styling
    const classes = useStyles();

    // deconstructing props
    const { authState } = props;
    
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
                        (
                            <>
                                <NavLink dir='/kennel' label='the kennel' />
                                <Typography>|</Typography>
                                <NavLink dir='/myacc' label='my account' />
                            </>
                        ) 
                        : 
                        (
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