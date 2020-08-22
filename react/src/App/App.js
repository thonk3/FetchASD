// messy imports
import React
  ,{ useState } 
  from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch as RouterSwitch
} from 'react-router-dom';

// component imports
import BunchoLinks from './BunchoLinks'
import NavBar from '../Common/NavBar/NavBar'

import * as Routes from '../Routes/Routes'
import useStyles from './App.style';

// material ui
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';

// for nav bar offset

//style
// const styles = theme => ({
//   offset: theme.mixins.toolbar,
// })

const App = () => {
  
  const classes = useStyles();

  // state hooks
  const [ state, setState ] = useState({
    loggedIn: false,
    adminAuth: false,
  });

  const handleLogToggle = (e) => setState({ ...state, [e.target.name]: !state.[e.target.name] });

  return (
    <div>
      <Router>
        <NavBar />
        <div className={classes.offset}></div>

        <BunchoLinks />
        <FormControlLabel name='loggedIn' control={<Switch checked={state.loggedIn} onChange={handleLogToggle} />} label={`logged in: ${state.loggedIn}`} />
        <FormControlLabel name='adminAuth' control={<Switch checked={state.adminAuth} onChange={handleLogToggle} disabled={!state.loggedIn}/>} label={`admin: ${state.adminAuth}`} />

        <div className={classes.borderThing}>
        <RouterSwitch>
          <Route exact path='/' component={Routes.Home} />
          <Route path='/login' component={Routes.Login} />
          <Route path='/register' component={Routes.Register} />
          <Route path='/myacc' component={Routes.Account} />
          <Route path='/myacc/mypack' component={Routes.DogMan} />
          <Route path='/myacc/payment' component={Routes.PaymentMan} />
          <Route path='/kennel' component={Routes.Kennel} />
          <Route path='/date' component={Routes.Dates} />
          <Route path='/admin/products' component={Routes.ProductMan} />

          <Route component={Routes.NotFound} />
        </RouterSwitch>
        </div>
      </Router>
    </div>
  )
};


export default App;