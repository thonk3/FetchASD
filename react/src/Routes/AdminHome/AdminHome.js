import React from 'react'
import { 
    BrowserRouter,
    Switch as RouterSwitch,
//    Link, 
} from 'react-router-dom'
import { Container } from '@material-ui/core'

// routes
import AdminRoute from '../../App/AdminRoute'
import LocMan from './LocMan/LocMan'
import UserMan from './UserMan/UserMan'
import Mesg from './Mesg/Mesg'
import User from './UserMan/Components/UserPage'
import UpdateLocation from './LocMan/UpdateLocation'
import CreateLocation from './LocMan/CreateLocation'

/* 
TODO

- chuck the 3 routes into navbar
*/

// probably need to pretty this up
const AdminHome = props => {

    return (
        <Container>
            <BrowserRouter>
                {/* 
                    popper bug, probably better to
                    do it like date, since its better for msg notifs
                */}

                {/* rendered components */}
                <RouterSwitch>
                    <AdminRoute path='/admin/loc_man/new' component={CreateLocation} />
                    <AdminRoute path='/admin/loc_man/:id' component={UpdateLocation} />
                    <AdminRoute path='/admin/user_man' component={UserMan} />
                    <AdminRoute path='/admin/loc_man' component={LocMan} />
                    <AdminRoute path='/admin/messages' component={Mesg} />
                    <AdminRoute path='/admin/:id' component={User} />
                </RouterSwitch>
            </BrowserRouter>
        </Container>
    )
}

export default AdminHome;