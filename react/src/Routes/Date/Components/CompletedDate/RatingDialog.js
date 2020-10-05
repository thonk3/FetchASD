/* 
    Component for user to make a rating 
*/

import React, { useState } from 'react'

import DialogContainer from '../DialogContainer'
import { Button, Box, Typography, TextField } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

const RatingDialog = props => {
    const [score, setScore] = useState(0);
    const [rating, setRating] = useState("");
    const { activeState, toggleDialog, date } = props;

    const changeRating = e => {
        if(rating.length <= 150)
            setRating(e.target.value)
        else setRating(rating.slice(0, 149))
    }

    // new rating
    const newRating = () => {
        console.log("hey this did something")
        console.log(date)

        console.log({
            rating: {
                score: score,
                review: rating,
            }
        })
    }

    // update ratings

    return (
        <DialogContainer
            activeState={activeState} toggleDialog={toggleDialog}
            dialogTitle="New Rating"
            contentTitle="Rate your date:"

            actionsButtons={
                <Button onClick={newRating} variant="contained" color="primary">Rate</Button>
            }
        >
            <p>Between {date.receiverDog.name} and {date.senderDog.name}</p>
            <p>at {date.location} on {new Date(Date.parse(date.dateOn)).toLocaleString('en-AU')}</p>

            <br />

            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Score</Typography>
                <Rating
                    value={score}
                    onChange={(event, newValue) => {
                        setScore(newValue);
                    }}
                />

                <br /> <br />
                <TextField 
                    label="Review" 
                    value={rating} onChange={changeRating}
                    variant="outlined" fullWidth
                    multiline="true" rowsMax="5" rows="3"/>
            </Box>

        </DialogContainer>
    )
}

export default RatingDialog;