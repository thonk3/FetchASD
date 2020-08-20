import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles'


// component imports
import BunchoLinks from './BunchoLinks'
import NavBar from '../Common/NavBar/NavBar'

import * as Routes from '../Routes/Routes'
import Style from './App.style';

// for nav bar offset

//style
// const styles = theme => ({
//   offset: theme.mixins.toolbar,
// })


class App extends React.Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Router>
          <NavBar />
          <div className={classes.offset}></div>

          <BunchoLinks />

          <div className={classes.borderThing}>
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
          </div>
        </Router>
      </div>
    )
  };
}

export default withStyles(Style, { withTheme: true })(App);