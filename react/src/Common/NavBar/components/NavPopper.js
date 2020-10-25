import React from "react";

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
      return <Link to={item.link}>
        <MenuItem onClick={() => setOpen(false)}>{item.display}</MenuItem>
      </Link>
    })
  }

  const renderLogOut = () => {
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

                  { PopperItems() }
                  { renderLogOut() }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        );
      }}
    </Popper>
  );
};

export default NavPopper;