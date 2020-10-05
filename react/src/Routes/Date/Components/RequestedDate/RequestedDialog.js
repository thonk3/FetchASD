import { Button } from '@material-ui/core';
import axios from 'axios';
/* 
    Dialog box showing requested Date
*/

import React from 'react'

import DialogContainer from '../DialogContainer'

const RequestedDialog = props => {
    const { toggleDialog, activeState, date } = props;

    // api calls
    // probably move this back to RequestedDateItem to remove the item from the list instead
    const handleAccept = () => {
        axios.post(`/api/date/accept/${date._id}`)
            .then(() => window.location('/date'))
            .catch((error) => console.log(error));
    }

    const handleDecline = () => {
        axios.post(`/api/date/decline/${date._id}`)
            .then(() => window.location('/date'))
            .catch((error) => console.log(error));
    }

    return (
        <DialogContainer
            activeState={activeState} toggleDialog={toggleDialog}
            dialogTitle="Date Request"
            contentTitle="Here are the date details:"
            actionsButtons={
                <>
                    <Button onClick={handleAccept} variant="contained">Accept</Button>
                    <Button onClick={handleDecline} variant="contained" color="primary">Decline</Button>
                </>
            }
        >
            <p>{date.senderDog.name} wants to go out with {date.receiverDog.name}</p>
            <p><b>Proposed date and time: </b> {new Date(Date.parse(date.dateOn)).toLocaleString('en-US')}</p>
            <p><b>Proposed Location: </b>{date.location}</p>

        </DialogContainer>
    )
}

export default RequestedDialog;