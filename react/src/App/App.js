// messy imports
import React
  ,{ useState } 
  from 'react';
import { 
  BrowserRouter,
  Route, 
  Switch as RouterSwitch
} from 'react-router-dom';

// component imports
import ForDemo from './ForDemo'
import NavBar from '../Common/NavBar/NavBar'
import * as Routes from '../Routes/Routes'

// material ui
import useStyles from './App.style';
import { Button } from '@material-ui/core';


const App = () => {
  
  const classes = useStyles();

  // state hooks
  const [ state, setState ] = useState({
    loggedIn: false,
    adminAuth: false,
    showDemo: true,
  });

  // set auth 
  const handleLogToggle = (e) => {
    setState({ ...state, [e.target.name]: !state.[e.target.name] });
    // console.log('a')
  }

  const handleDemoToggle = (e) => {
    setState({ ...state, showDemo: false });
  }

  return (
    <BrowserRouter>
        <NavBar authState={state.loggedIn} />
        <div className={classes.offset}></div>

        { state.showDemo ?
        <>
          <ForDemo authState={state} switchChange={handleLogToggle}/>
          <Button variant="contained" color="secondary" onClick={handleDemoToggle}>CLOSE</Button>
        </> :
        <>
        </> }

        {/* ------------------------------------- */}

        {/* delet DemoThing later thing later */}
        <div className={state.showDemo ? classes.borderThing : null}>
        {/* <div> */}
        <RouterSwitch>
          <Route exact path='/' component={() => <Routes.Home loggedIn={state.loggedIn} />} />
          <Route path='/login' component={Routes.Login} />
          <Route path='/register' component={Routes.Register} />
          <Route path='/myacc' component={Routes.AccountMan} />
          <Route path='/myacc/mypack' component={Routes.DogMan} />
          <Route path='/kennel' component={Routes.Kennel} />
          <Route path='/:id' component={Routes.Dog} />
          <Route path='/date' component={Routes.Dates} />
          <Route path='/date/id' component={Routes.RateDate} />
          <Route path='/admin' component={Routes.AdminHome} />

          <Route component={Routes.NotFound} />
        </RouterSwitch>
        </div>
    </BrowserRouter>
  )
};


export default App;