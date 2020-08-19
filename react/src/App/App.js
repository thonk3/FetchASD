import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles'


// component imports
// import Sample from '../Common/Sample'
// import NotFound from '../Routes/NotFound/NotFound'
// import Main from '../Routes/Home/Home'
import BunchoLinks from './BunchoLinks'
import NavBar from '../Common/NavBar/NavBar'
import * as Routes from '../Routes/Routes'
import useStyle from '../Common/NavBar/NavBar.style';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <div className='App'>
    {/* 
      r0 features

      account man
      dog man
      kennel
      date
      payment man
      product man

     */}
      <Router>
        <NavBar />
        <div className={classes.offset}></div>
        <BunchoLinks />
      
        {/* routing */}
        <Switch>
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
        </Switch>
        
      </Router>

    </div>
  );
}

export default App;
