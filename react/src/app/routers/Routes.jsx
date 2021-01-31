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
const pub = [
    { type: 'pub', path: '/', component: Pages.Home, exact: true },
    { type: 'pub', path: '/register', component: Pages.Register, exact: false },
    { type: 'pub', path: '/login', component: Pages.Login, exact: false },
    { type: 'pub', path: '/newmsg', component: Pages.NewMsg, exact: false },
];

const user = [
    { type: 'user', path: '/myacc/mypack/newdog', component: Pages.CreateDog, exact: false },
    { type: 'user', path: '/myacc/mypack/:id', component: Pages.UpdateDog, exact: false },
    { type: 'user', path: '/myacc/mypack', component: Pages.DogMan, exact: false },
    { type: 'user', path: '/events', component: Pages.Event, exact: false },
    { type: 'user', path: '/event/create', component: Pages.EventCreate, exact: true },
    { type: 'user', path: '/event/update/:id', component: Pages.EventUpdate, exact: true },
    { type: 'user', path: '/event/:id', component: Pages.EventDetails, exact: false },
    { type: 'user', path: '/myacc', component: Pages.AccountMan, exact: false },
    { type: 'user', path: '/date', component: Pages.Dates, exact: false },
    { type: 'user', path: '/inquiries', component: Pages.UserMsg, exact: false },
];

const admin = [
    { type: 'admin', path: '/admin/messages', component: Pages.AdminMsg },
    { type: 'admin', path: '/admin/loc_man/new', component: Pages.AdminLocCreate },
    { type: 'admin', path: '/admin/loc_man/:id', component: Pages.AdminLocUpdate },
    { type: 'admin', path: '/admin/loc_man', component: Pages.AdminLocMan },
    { type: 'admin', path: '/admin/user_man', component: Pages.AdminUserList },
    { type: 'admin', path: '/admin/:id', component: Pages.AdminUserUpdate },
]

const misc = [
    { type: 'dog', path: '/:id', component: Pages.Dog },
    { type: '404', component: Pages.NotFound },
]

// --------------------------------------------------------------------------------
const AppRoutes = () => {
    let routeList = [
        ...pub,
        ...user,
        ...admin,
        ...misc
    ]
    return (
        <Switch>
            {
                routeList.map((e, i) => {
                    if (e.type === "pub")
                        return <Route key={i} exact={e.exact} path={e.path} component={e.component} />
                    else if (e.type === "user")
                        return <UserRoute key={i} exact={e.exact} path={e.path} component={e.component} />
                    else if (e.type === "admin")
                        return <AdminRoute key={i} exact={e.exact} path={e.path} component={e.component} />
                    else if (e.type === "dog")
                        return <UserRoute key={i} path={e.path} component={e.component} />
                    else return <Route key={i} component={e.component} />
                })
            }
        </Switch>
    )
}

export default AppRoutes;
