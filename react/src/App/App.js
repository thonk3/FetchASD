// messy imports
import React
  ,{ useState } 
  from 'react';
import { 
  Route, 
  Switch as RouterSwitch
} from 'react-router-dom';

// component imports
import ForDemo from './BunchoLinks'
import NavBar from '../Common/NavBar/NavBar'
import * as Routes from '../Routes/Routes'

// material ui
import useStyles from './App.style';

// temp
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';

const App = () => {
  
  const classes = useStyles();

  // state hooks
  const [ state, setState ] = useState({
    loggedIn: false,
    adminAuth: false,
  });

  // set auth 
  const handleLogToggle = (e) => {
    setState({ ...state, [e.target.name]: !state.[e.target.name] });
    // console.log('a')
  }

  return (
    <div>
        <NavBar />
        <div className={classes.offset}></div>

        <ForDemo authState={state} switchChange={handleLogToggle}/>
        {/* ------------------------------------- */}

        {/* delet DemoThing later thing later */}
        <div className={classes.borderThing}>
        <RouterSwitch>
          <Route exact path='/' component={() => <Routes.Home loggedIn={state.loggedIn} />} />
          <Route path='/login' component={Routes.Login} />
          <Route path='/register' component={Routes.Register} />
          <Route path='/myacc' component={Routes.AccountMan} />
          <Route path='/myacc/mypack' component={Routes.DogMan} />
          <Route path='/kennel' component={Routes.Kennel} />
          <Route path='/date' component={Routes.Dates} />
          <Route path='/date/id' component={Routes.RateDate} />
          <Route path='/admin' component={Routes.AdminHome} />

          <Route component={Routes.NotFound} />
        </RouterSwitch>
        </div>
    </div>
  )
};


export default App;