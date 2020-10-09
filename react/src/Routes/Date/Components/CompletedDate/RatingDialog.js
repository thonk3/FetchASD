/* 
    Component for user to make a rating 
*/

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import token from '../../../../Helpers/token'

import DialogContainer from '../DialogContainer'
import { Button, Box, Typography, TextField } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

// rating dialog notes
// 

const RatingDialog = props => {
    const [loading, setLoading] = useState(true)

    const [rateMeID, setRateMeID] = useState("");
    const [rateByID, setRateByID] = useState("")
    const [score, setScore] = useState(0);
    const [rating, setRating] = useState("");
    const [isNewRating, setIsNewRating] = useState(true);

    const { activeState, toggleDialog, date } = props;

    // load and check if the date has been rated or not
    const getData = () => {
        const payload = {
            userID: token().id,
            date: {
                dateID: date._id,
                senderID: date.senderDog.senderDogID,
                receiverID: date.receiverDog.receiverDogID,
            }
        }

        // post data and get response
        axios.post('/api/rate/check', payload)
            .then(res => {
                if(res.status === 200) {
                    setLoading(false);
                    setRateMeID(res.data.rateMeID); // setting ids for form
                    setRateByID(res.data.rateByID);
                    if(!res.data.isNew) {   // set old data
                        setIsNewRating(false);  // update instead 
                        // setScore(res.data.rating.score);
                        // setRating(res.data.rating.rating);
                    }
                }
            })
            .catch(e => console.log("error:", e))

    }
    useEffect(() => getData(), [])
    // ===============================================

    // handling change score number
    const changeRating = e => {
        if(rating.length <= 150) setRating(e.target.value)
        else setRating(rating.slice(0, 149))
    }

    const submitRating = () => {
        console.log("submitting rating changes")
        if (isNewRating) newRating();
        else updateRating();
    }

    // submit new rating to change
    const newRating = () => {
        console.log("creating new rating")
        alert("creating new rating")

        console.log({
            rating: {
                score: score,
                review: rating,
            }
        })
    }

    // update ratings
    const updateRating = () => {
        console.log("update rating");
        alert("update rating");
        
        console.log({
            rating: {
                score: score,
                review: rating,
            }
        })
    }

    // delete ratings
    const deleteRating = () => {

    }

    return (
        <DialogContainer
            activeState={activeState} toggleDialog={toggleDialog}
            dialogTitle="New Rating"
            contentTitle="Rate your date:"

            actionsButtons={
                <Button onClick={submitRating} variant="contained" color="primary">
                    { isNewRating ? "Rate" : "Update" }
                </Button>
            }
        >
            <p>Between {date.receiverDog.name} and {date.senderDog.name}</p>
            <p>at {date.location} on {new Date(Date.parse(date.dateOn)).toLocaleString('en-AU')}</p>

            <br />

            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Score</Typography>
                <Rating
                    value={score}
                    onChange={(event, newValue) => setScore(newValue)}
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