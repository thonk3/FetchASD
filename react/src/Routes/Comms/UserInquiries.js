/* 
    page to view list of inquiries
    user can view the details of their past enquiries
    user can also chose to delete their own messages
*/
import React from 'react'
import { Button } from '@material-ui/core'

// ok deffinitely need redirect??

const UserInquiries = props => {

    return (
        <>
            <Button onClick={() => window.location = '/newmsg'}> new inquiry </Button>
        </>
    )
}

export default UserInquiries;
