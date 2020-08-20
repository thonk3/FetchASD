import React from 'react';
// import useStyle from './NavBar.style'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles'
import Style from './NavBar.style'

import { Link } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
// import BunchoLinks from '../../App/BunchoLinks';

const a = theme => ({
    root: {
        flexGrow: 1,
    }, 
    button: {
        marginRight: theme.spacing(2),
    },
    menuTitle: {
        flexGrow: 1,
    },
    menuLink: {
        color: '#fff !important' ,
    }
})

class NavBar extends React.Component {
    // const classes = this;
    
    // hooks
    // const [drawerState , setDrawerState] = React.useState({
    //     drawerOpen: false,
    // });

    // drawer thing
    // const toggleDrawer = (open) => e => {
    //     setDrawerState({ drawerOpen: open });
    //     // alert(drawerState.drawerOpen);
    // }

    render () {
        const { classes } = this.props;

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
}

export default withStyles(Style, { withTheme: true })(NavBar);