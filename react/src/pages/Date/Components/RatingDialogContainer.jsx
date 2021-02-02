/* 
    Component for user to make a rating 
*/

import React, { useState } from 'react'

const RatingDialog = props => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    // new rating

    // update rating

    return (
        <h1>This be the rating dialogue</h1>
    )
}