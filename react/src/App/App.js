// messy imports
import React from 'react';
import { 
  // BrowserRouter,
  Route, 
  Switch as RouterSwitch
} from 'react-router-dom';

// component imports
import NavBar from '../Common/NavBar/NavBar'
import * as Routes from '../Routes/Routes'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
// import Footer from '../Common/Footer/Footer';

// material ui
import useStyles from './App.style';
import { /* CssBaseline, */ Typography } from '@material-ui/core';

const App = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}

      <div className={classes.main}>
        <NavBar />
        <div className={classes.offset}></div>
        
          <RouterSwitch>
            <Route exact path='/' component={Routes.Home} />
            <Route path='/register' component={Routes.Register} />
            <Route path='/login' component={Routes.Login} />

            {/* dog management */}
            <PrivateRoute path='/myacc/mypack/newdog' component={Routes.CreateDog} />
            <PrivateRoute path='/myacc/mypack/:id' component={Routes.UpdateDog} />
            <PrivateRoute path='/myacc/mypack' component={Routes.DogMan} />

            <PrivateRoute path='/myacc' component={Routes.AccountMan} />
            <PrivateRoute path='/date' component={Routes.Dates} />
            <PrivateRoute path='/date/id' component={Routes.RateDate} />

            <AdminRoute path='/admin' component={Routes.AdminHome} />
            <PrivateRoute path='/:id' component={Routes.Dog} />

            <Route component={Routes.NotFound} />
          </RouterSwitch>
      </div>

      <footer className={classes.footer}>
        <Typography variant="caption" style={{margin: 'auto'}}>
            Copyright © {new Date().getFullYear()} Fetch
        </Typography>
      </footer>
    </div>
  )
};


export default App;