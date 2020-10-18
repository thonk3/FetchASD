/* 
    Component for user to make a rating 
*/

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import token from '../../../../Helpers/token'

// import Spinner from '../../../../Common/NavBar'
import DialogContainer from '../DialogContainer'
import { Button, Box, Typography, TextField } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

// rating dialog notes
// im sorry me codes terribad

const RatingDialog = props => {
    const { activeState, toggleDialog, date } = props;

    const [loading, setLoading] = useState(false)

    const [rateMeID, setRateMeID] = useState("");
    const [rateByID, setRateByID] = useState("");
    const [score, setScore] = useState(0);
    const [rating, setRating] = useState("");
    const [isNewRating, setIsNewRating] = useState(true);


    
    useEffect(() => {
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
                        setScore(res.data.rating.score);
                        setRating(res.data.rating.rating);
                    }
                }
            }).catch(e => console.log("error:", e))
    }, [date]);
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

    const ratingPayload = {
        dateID: date._id,
        rateMeID: rateMeID,
        rateByID: rateByID,
        score: score,
        review: rating,
    }

    // submit new rating to change
    const newRating = () => {
        setLoading(true);
        axios.post("/api/rate/new", ratingPayload)
            .then(() => {
                setLoading(false);
                toggleDialog();
                setIsNewRating(false);
            })
            .catch(e => console.log(e));
    }

    // update ratings
    const updateRating = () => {
        setLoading(true);
        axios.post("/api/rate/update", ratingPayload)
            .then(() => {
                setLoading(false);
                toggleDialog();
            })
            .catch(e => console.log(e));
    }

    // delete ratings
    const deleteRating = () => {
        const payload = { dogID: rateMeID, dateID: date._id, }

        setLoading(false);
        axios.post(
                "/api/rate/delete", 
                payload
            )
            .then(() => {
                setLoading(false);
                toggleDialog();
                setIsNewRating(true);
                setRating("");
                setScore(0);
            })
            .catch(e => console.log(e));
    }


    return (
        <DialogContainer
            activeState={activeState} toggleDialog={toggleDialog}
            dialogTitle="New Rating"
            contentTitle="Rate your date:"

            actionsButtons={
                <>
                    {
                        isNewRating ?
                        <></>
                        :
                        <Button onClick={deleteRating} variant="contained">
                            Delete
                        </Button>
                    }

                <Button onClick={submitRating} variant="contained" color="primary">
                    { isNewRating ? "Rate" : "Update" }
                </Button>
                </>
            }
        >
            {
                loading ?
                <> </>
                :
                <>
                    <p>Between {date.receiverDog.name} and {date.senderDog.name}</p>
                    <p>at {date.location} on {new Date(Date.parse(date.dateOn)).toLocaleString('en-AU')}</p>
                    <br />
            
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        {/* rating star thing */}
                        <Typography component="legend">Score</Typography>
                        <Rating
                            value={score}
                            onChange={(event, newValue) => setScore(newValue)} />
                        <br /> <br />{/* review */}
                        <TextField  
                            label="Review" 
                            value={rating} onChange={changeRating}
                            variant="outlined" fullWidth
                            multiline="true" rowsMax="5" rows="3"/>
                    </Box>
                </>
            }
            {/* body content of the dialog */}

        </DialogContainer>
    )
}

export default RatingDialog;