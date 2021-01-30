import React from 'react'
import { Route } from 'react-router-dom'
import * as Pages from '../pages/Pages'
import UserRoute from './UserRoute'
import AdminRoute from './AdminRoute'
import PrivateRoute from './UserRoute'

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
    { path: '/', component: Pages.Home, exact: true },
    { path: '/register', component: Pages.Register, exact: false },
    { path: '/login', component: Pages.Login, exact: false },
    { path: '/newmsg', component: Pages.NewMsg, exact: false },
];

// need to test
const userRoutes = [
    { path: '/myacc/mypack/newdog', component: Pages.CreateDog, exact: false },
    { path: '/myacc/mypack/:id', component: Pages.UpdateDog, exact: false },
    { path: '/myacc/mypack', component: Pages.DogMan, exact: false },
    { path: '/events', component: Pages.Event, exact: false },
    { path: '/event/create', component: Pages.EventCreate, exact: true },
    { path: '/event/update/:id', component: Pages.EventUpdate, exact: true },
    { path: '/event/:id', component: Pages.EventDetails, exact: false },
    { path: '/myacc', component: Pages.AccountMan, exact: false },
    { path: '/date', component: Pages.Dates, exact: false },
    { path: '/inquiries', component: Pages.UserMsg, exact: false },
];

// need to test
const adminRoutes = [
    { path: '/admin/messages', component: Pages.AdminMsg },
    { path: '/admin/loc_man/new', component: Pages.AdminLocCreate },
    { path: '/admin/loc_man/:id', component: Pages.AdminLocUpdate },
    { path: '/admin/loc_man', component: Pages.AdminLocMan },
    { path: '/admin/user_man', component: Pages.AdminUserList },
    { path: '/admin/:id', component: Pages.AdminUserUpdate },
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
    <PrivateRoute path="/:id" component={Pages.Dog} />;
export const NotFoundRoute = () =>
    <Route component={Pages.NotFound} />;