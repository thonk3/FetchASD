import React from 'react'
import { Route } from 'react-router-dom'
import * as Routes from '../pages/Routes'
import UserRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'

/* 
    This component handle all the routes of the app
    used in App.jsx to render all the pages

    handles all
        public pages    - no account required
        user pages      - account required
        admin pages     - account with admin autherization
*/

// --------------------------------------------------------------------------------
// list of routes to render
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

// --------------------------------------------------------------------------------
// rendering the routes
// rendering routes methods
export const PublicRoutes = () => pubRoutes.map(e =>
    <Route path={e.path} exact={e.exact} component={e.component} />);
export const UserRoutes = () => userRoutes.map(e =>
    <UserRoute path={e.path} exact={e.exact} component={e.component} />);
export const AdminRoutes = () => adminRoutes.map(e =>
    <AdminRoute path={e.path} exact={e.exact} component={e.component} />);
// cant seem to have component as a funtion param for some reason


// NOTE:    fix this component to process cases where the id is invalid
//          in cases that user stumble on this randomly
export const DogIDRoute = () =>
    <PrivateRoute path="/:id" component={Routes.Dog} />;
export const NotFoundRoute = () =>
    <Route component={Routes.NotFound} />;