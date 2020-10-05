/* 
    Component for user to make a rating 
*/

import React/* , { useState } */ from 'react'

import DialogContainer from '../DialogContainer'

const RatingDialog = props => {
    const { openStatus, toggleDialog/* , date  */} = props;


    // new rating

    // update ratings

    return (
        <DialogContainer
            activeState={openStatus} toggleDialog={toggleDialog}
            dialogTitle="New Rating"
            contentTitle="Rate your date:"
        >
            THIS BE THE RATING THING
        </DialogContainer>
    )
}

export default RatingDialog;