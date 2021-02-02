import React from "react";

import PropTypes from 'prop-types';
import {  
  Popper, Grow, Paper, ClickAwayListener, MenuItem, MenuList
}
from '@material-ui/core'
import { Link } from 'react-router-dom'

const NavPopper = props => {
  const {
    open, setOpen,
    logOutHandler,
    anchorRef,
    handleListKeyDown,
    logOut,
    popperItems

  } = props;

  const PopperItems = () => {
    return popperItems.map(item => {
      return <Link style={{ textDecoration: "none" }} to={item.link}>
        <MenuItem  onClick={() => setOpen(false)}>{item.display}</MenuItem>
      </Link>
    })
  }

  const LogOut = () => {
    if(logOut) 
      return <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
  }

  return (
    <Popper open={open} anchorEl={anchorRef.current} transition disablePortal >
      
      {({ TransitionProps }) => {
        return (
          <Grow {...TransitionProps} >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown} >

                  { PopperItems() /* drop down items */}
                  { LogOut() }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        );
      }}
    </Popper>
  );
};

NavPopper.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    logOutHandler: PropTypes.func,
    // anchorRef,   // not sure the type of this

    logOut: PropTypes.bool,   // why is this here
    handleListKeyDown: PropTypes.func,
    popperItems: PropTypes.arrayOf(PropTypes.object),
}

export default NavPopper;