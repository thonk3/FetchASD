import React from 'react';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './NavBar.style';

const NavBar = props => {
    const classes = useStyles();
    
    return (
        <div className={classes.menuRoot}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color='inherit' aria-label='menu'
                        >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.menuTitle}>Fetch</Typography>

                    <Link to='/login'>
                        <Button className={classes.menuLink}>Login</Button>
                    </Link>

                    <Link to='/register'>
                        <Button className={classes.menuLink}>Register</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};


export default NavBar;