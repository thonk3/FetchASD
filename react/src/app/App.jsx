// messy imports
import React from 'react';
// component imports
import NavBar from '../components/navBar/NavBar'
import AppRoutes from './routers/Routes'
// material ui
import useStyles from './App.style';
import { Typography } from '@material-ui/core';


/* 
  App component
    handling the routing of the whole app
    setting up the general layout including Nav and Footer
*/

// --------------------------------------------------------------------------------
const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <NavBar />
        <div className={classes.navOffset}></div>

        <AppRoutes />
  </div>

      <Footer styleClass={classes.footer} />
    </div>
  )
};

const Footer = ({styleClass}) => (
  <footer className={styleClass}>
    <Typography variant="caption" style={{ margin: 'auto' }}>
      Copyright © {new Date().getFullYear()} Fetch
        </Typography>
  </footer>
)


export default App;