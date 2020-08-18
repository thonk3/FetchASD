import React from 'react';
import { 
  Link
} from 'react-router-dom';

      // r0 features

      // account man
      // dog man
      // kennel
      // date
      // payment man
      // product man
      
class NavBar extends React.Component {
  render() {
    return (
      <ul>
        <li><Link to='/'>Home page</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/myacc'>Account management</Link></li>
        <li><Link to='/myacc/mypack'>Dog man page</Link></li>
        <li><Link to='/login'>Log in</Link></li>
        <li><Link to='/myacc/payment'>payment man page</Link></li>
        <li><Link to='/kennel'>kennel page</Link></li>
        <li><Link to='/date'>date management</Link></li>
        <li><Link to='/admin/products'>Admin/Product management</Link></li>
      </ul>
    )
  }
}



export default NavBar;
