// messy imports
import React from 'react';
import { 
  BrowserRouter,
  Route, 
  Switch as RouterSwitch
} from 'react-router-dom';

// component imports
import NavBar from '../Common/NavBar/NavBar'
import * as Routes from '../Routes/Routes'
import PrivateRoute from './PrivateRoute'
import Footer from '../Common/Footer/Footer';

// material ui
import useStyles from './App.style';
import { useAuth } from '../Context/authContext'


const App = (props) => {
  const classes = useStyles();

  // demo nonsense

  return (
    <BrowserRouter>
      {/* nav */}
      <NavBar />
      <div className={classes.offset}></div>

      {/* content */}
      <RouterSwitch>
        <Route exact path='/' component={Routes.Home} />
        <Route path='/login' component={Routes.Login} />
        <Route path='/register' component={Routes.Register} />
          
        {/* only logged in users can see these */}
        <PrivateRoute path='/myacc/mypack' component={Routes.DogMan} />
        <PrivateRoute path='/myacc' component={Routes.AccountMan} />
        <PrivateRoute path='/date' component={Routes.Dates} />
        <PrivateRoute path='/date/id' component={Routes.RateDate} />
        <PrivateRoute path='/admin' component={Routes.AdminHome} />
        <PrivateRoute path='/:id' component={Routes.Dog} />

        <Route component={Routes.NotFound} />
      </RouterSwitch>
      <Footer />
    </BrowserRouter>
  )
};


export default App;