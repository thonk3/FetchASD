import React from 'react'
import { 
    BrowserRouter,
    Switch as RouterSwitch,
    Link
} from 'react-router-dom'
import { Container } from '@material-ui/core'

// routes
import AdminRoute from '../../App/AdminRoute'
import LocMan from './LocMan/LocMan'
import UserMan from './UserMan/UserMan'
import Mesg from './Mesg/Mesg'

const AdminHome = props => {

    return (
        <Container>
            <BrowserRouter>
                <p>maybe have 3 buttons that switches between pages? for admin</p>
                <p>or move all of this back to App.js</p>

                {/* temp links for quick develop,emt */}
                <Link to='/admin/user_man'>
                    <p>user management</p>
                </Link>
                <Link to='/admin/loc_man'>
                    <p>location management</p>
                </Link>
                <Link to='/admin/messages'>
                    <p>messages</p>
                </Link>

                {/* rendered components */}
                <RouterSwitch>
                    <AdminRoute path='/admin/user_man' component={UserMan} />
                    <AdminRoute path='/admin/loc_man' component={LocMan} />
                    <AdminRoute path='/admin/messages' component={Mesg} />
                </RouterSwitch>
            </BrowserRouter>
        </Container>
    )
}

export default AdminHome;