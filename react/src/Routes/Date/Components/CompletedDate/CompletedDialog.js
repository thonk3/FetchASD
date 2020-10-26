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
            <p><b>When:</b> {new Intl.DateTimeFormat("en-AU", { 
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date(date.dateOn))} at {new Intl.DateTimeFormat("en-AU", { 
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "Australia/Sydney",
                        timeZoneName: "short"
                    }).format(new Date(date.dateOn))}</p>
            <p><b>Where:</b> {date.location}</p>
        </DialogContainer>
    )
}

export default CompletedDialog;