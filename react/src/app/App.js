// messy imports
import React from 'react';
import {
  // BrowserRouter,
  Route,
  Switch as RouterSwitch
} from 'react-router-dom';

// component imports
import NavBar from '../components/NavBar/NavBar'
import * as Routes from '../Routes/Routes'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

// material ui
import useStyles from './App.style';
import { Typography } from '@material-ui/core';

const App = (props) => {
  const classes = useStyles();

  // list for routes to render
  const pubRoutes = [
    { path: '/', component: Routes.Home, exact: true },
    { path: '/register', component: Routes.Register, exact: false },
    { path: '/login', component: Routes.Login, exact: false },
    { path: '/newmsg', component: Routes.NewMsg, exact: false },
  ];

  // need to test
  const userRoutes = [
    { path: '/myacc/mypack/newdog', component: Routes.CreateDog, exact: false },
    { path: '/myacc/mypack/:id', component: Routes.UpdateDog, exact: false },
    { path: '/myacc/mypack', component: Routes.DogMan, exact: false },
    { path: '/events', component: Routes.Event, exact: false },
    { path: '/event/create', component: Routes.EventCreate, exact: true },
    { path: '/event/update/:id', component: Routes.EventUpdate, exact: true },
    { path: '/event/:id', component: Routes.EventDetails, exact: false },
    { path: '/myacc', component: Routes.AccountMan, exact: false },
    { path: '/date', component: Routes.Dates, exact: false },
    { path: '/inquiries', component: Routes.UserMsg, exact: false },
  ];

  // need to test
  const adminRoutes = [
    { path: '/admin/messages', component: Routes.AdminMsg },
    { path: '/admin/loc_man/new', component: Routes.AdminLocCreate },
    { path: '/admin/loc_man/:id', component: Routes.AdminLocUpdate },
    { path: '/admin/loc_man', component: Routes.AdminLocMan },
    { path: '/admin/user_man', component: Routes.AdminUserList },
    { path: '/admin/:id', component: Routes.AdminUserUpdate },
  ]

  // rendering routes methods
  const PublicRoutes = () => pubRoutes.map(e =>
    <Route path={e.path} exact={e.exact} component={e.component} />);
  const UserRoutes = () => userRoutes.map(e =>
    <PrivateRoute path={e.path} exact={e.exact} component={e.component} />);
  const AdminRoutes = () => adminRoutes.map(e =>
    <AdminRoute path={e.path} exact={e.exact} component={e.component} />);
  // cant seem to have component as a funtion param for some reason

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <NavBar />
        <div className={classes.offset}></div>

        <RouterSwitch>
          <PublicRoutes />
          <UserRoutes />
          <AdminRoutes />

          <PrivateRoute path='/:id' component={Routes.Dog} />
          {/* NOTE: fix this component to process cases where the id is invalid, in cases that user stumble on this randomly */}

          <Route component={Routes.NotFound} />
        </RouterSwitch>
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