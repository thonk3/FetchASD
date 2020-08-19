import React from 'react';
import useStyle from './NavBar.style'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Link from "@material-ui/core/Link"

import { Link } from 'react-router-dom';


export default function ButtonAppBar() {
    const classes = useStyle();

    return (
        <div className={classes.menuRoot}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.menuTitle}> Fetch </Typography>
                    

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
}