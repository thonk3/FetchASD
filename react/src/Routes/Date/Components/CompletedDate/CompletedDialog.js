/* 
    Dialog box showing completed date detail
*/

import React from 'react'

import DialogContainer from '../DialogContainer'

const CompletedDialog = props => {
    const { activeState, toggleDialog, date } = props;

    return (
        <DialogContainer
            activeState={activeState} toggleDialog={toggleDialog}
            dialogTitle="Completed Date"
            contentTitle="Here are the details of your date:"
        >
            <p>{date.senderDog.name} went out with {date.receiverDog.name}</p>
            <p>When: {new Date(Date.parse(date.dateOn)).toLocaleString('en-AU')}</p>
            <p>Where: {date.location}</p>
        </DialogContainer>
    )
}

export default CompletedDialog;