import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as Pages from '../../pages/Pages'
import UserRoute from './UserRoute'
import AdminRoute from './AdminRoute'

/* 
    This component handle all the routes of the app
    used in App.jsx to render all the pages

    handles all
        public pages    - no account required
        user pages      - account required
        admin pages     - account with admin autherization
*/

// --------------------------------------------------------------------------------
const AppRoutes = () => {
    return (
        <Switch>
            {/* public pages */}
            <Route exact path='/' component={Pages.Home} />
            <Route path='/register' component={Pages.Register} />
            <Route path='/login' component={Pages.Login} />
            <Route path='/newmsg' component={Pages.NewMsg} />
            {/* user pages */}
            <UserRoute path='/myacc/mypack/newdog' component={Pages.CreateDog} />
            <UserRoute path='/myacc/mypack/:id' component={Pages.UpdateDog} />
            <UserRoute path='/myacc/mypack' component={Pages.DogMan} />
            <UserRoute path='/events' component={Pages.Event} />
            <UserRoute exact path='/event/create' component={Pages.EventCreate} />
            <UserRoute exact path='/event/update/:id' component={Pages.EventUpdate} />
            <UserRoute path='/event/:id' component={Pages.EventDetails} />
            <UserRoute path='/myacc' component={Pages.AccountMan} />
            <UserRoute path='/date' component={Pages.Dates} />
            <UserRoute path='/inquiries' component={Pages.UserMsg} />
            {/* admin pages */}
            <AdminRoute path='/admin/messages' component={Pages.AdminMsg} />
            <AdminRoute path='/admin/loc_man/new' component={Pages.AdminLocCreate} />
            <AdminRoute path='/admin/loc_man/:id' component={Pages.AdminLocUpdate} />
            <AdminRoute path='/admin/loc_man' component={Pages.AdminLocMan} />
            <AdminRoute path='/admin/user_man' component={Pages.AdminUserList} />
            <AdminRoute path='/admin/:id' component={Pages.AdminUserUpdate} />
            {/* misc pages */}
            <UserRoute path='/:id' component={Pages.Dog} />
            <Route component={Pages.NotFound} />
        </Switch>
    )
}

export default AppRoutes;
