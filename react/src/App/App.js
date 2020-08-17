import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch
} from 'react-router-dom'
// import './App.css';

// component imports
// import Sample from '../Common/Sample'
// import NotFound from '../Routes/NotFound/NotFound'
// import Main from '../Routes/Home/Home'
import * as Routes from '../Routes/Routes'

function App() {
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
        {/* nav */}
        <ul>
          <li><Link to='/'>Home page</Link></li>
          <li><Link to='/login'>Log in</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/myacc'>Account management</Link></li>
          {/* <li><Link to='/dog'>Dog man page</Link></li> */}
          <li><Link to='/kennel'>kennel page</Link></li>
          <li><Link to='/date'>date management</Link></li>
          {/* <li><Link to='/payment'>payment man page</Link></li> */}
          <li><Link to='/admin/products'>Admin/Product management</Link></li>
        </ul>
        {/* remember to chuck nav into its own component */}
      
        {/* routing */}
        <Switch>
          <Route exact path='/' component={Routes.Home} />
          <Route path='/login' component={Routes.Login} />
          <Route path='/register' component={Routes.Register} />
          <Route path='/myacc' component={Routes.Account} />
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
