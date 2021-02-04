import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    Button, Grid, FormGroup, InputLabel, Select,
    MenuItem, TextField, Box, Typography,
    Dialog, DialogContent, DialogTitle
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PickLocationCard from '../kennel/PickLocationCard';

const DateRequest = props => {
    const {
        myDogs,
        filterTerm,
        filterLocations,
        filteredLocation,
    } = props;

    // date dialogue
    const [newDate, setNewDate] = useState(false);

    // dialogues open
    const [dateRqDialog, setDateRqDialog] = useState(false)
    const [locationSelect, setLocationSelect] = useState(false);

    // date data
    const [senderDog, setSenderDog] = useState("");
    const [dateTime, setDateTime] = useState(null);
    const [locationID, setLocationID] = useState("");
    const [locationAddr, setLocationAddr] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    // --------------------------------------------------------------------------------
    // setters
    const changeDateSender = (e) => setSenderDog(e.target.value);
    const changeDateTime = (e) => setDateTime(e);

    const toggleNewDate = () => setNewDate(() => {console.log(!newDate); return !newDate});


    const onRequestSubmit = () => {
        // submit date request
    }



    // togglers
    const toggleLocationSelect = () => setLocationSelect(!locationSelect);
    const closeLocationSelect = () => setLocationSelect(false);

    // pick location
    const pickLocation = (e) => {
        toggleLocationSelect();
        setLocationID(e._id);
        setLocationAddr(e.Address);
    }

    // --------------------------------------------------------------------------------
    const showLocationPicker = () => {
        if (newDate) return (
            <Grid container direction="column" alignItems="left">
                <form>
                    <FormGroup>
                        {/* dog to date selector */}
                        <InputLabel>Which dog?</InputLabel>
                        <Select value={senderDog} onChange={changeDateSender}> {/* AAA */}
                            {myDogs.map((dog, i) => <MenuItem value={dog._id} key={i}>{dog.Name} </MenuItem>)}
                        </Select>
                        <br />
                        {/* date time selector */}
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDateTimePicker
                                //autoOk
                                variant="inline"
                                label="Time and Date"
                                disablePast
                                value={dateTime}
                                required
                                onChange={changeDateTime}
                            />
                        </MuiPickersUtilsProvider>
                        <br />
                        {/* location dialogue */}
                        <TextField
                            label="Choose your own location"
                            value={locationAddr}
                            onChange={e => setLocationAddr(e.target.value)}
                        />
                        <br />
                        <Typography align="center"><strong>OR</strong></Typography>
                        <br />
                        {/* // This will open to a full width xl scrolling body dialog box */}
                        <Button variant="contained" color="primary" onClick={toggleLocationSelect}>
                            Choose an approved location
                                    </Button>

                        <br />
                        {/* Dialog box that has body scroll has full width and is extra large */}
                        <Dialog open={locationSelect} onClose={closeLocationSelect} scroll="body" fullWidth={true} maxWidth={"xl"}>
                            <DialogTitle>{"Pick from one of our approved locations!"}</DialogTitle>
                            <DialogContent>
                                <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                                    <TextField placeholder="Search for location name or address here..."
                                        fullWidth variant="outlined" value={filterTerm}
                                        onChange={filterLocations} />
                                </Box>
                                {/* This will create a location cards inside the appearing dialog box */}
                                <Grid container spacing={2} style={{ justifyContent: "center", marginBottom: "1vw" }}>
                                    {/* If getFilteredLocations returns an array of objects if there are objects in the array
                                                    it returns the Location cards according to the filter. Otherwise, no objects are in the array meaning 
                                                    no objects match the search filter, produce a no location found string */}
                                    {
                                        filteredLocation.length
                                            ?
                                            filteredLocation.map(location => <PickLocationCard obj={location} onChange={(e) => this.onPickLocation(location)} />)
                                            :
                                            <Typography component="h1" variant="h4" style={{ margin: "1vw" }}>{" No Location Found 😢"}</Typography>
                                    }
                                </Grid>
                            </DialogContent>
                        </Dialog>

                        {/* date request button */}
                        <Box display="flex" justifyContent="space-between">
                            <Button style={{ width: '49%' }} onClick={toggleNewDate} variant="contained" color="default"> Cancel </Button>
                            <Button style={{ width: '49%' }} type="submit" onClick={onRequestSubmit} variant="contained" color="primary">
                                Send
                                        </Button>
                        </Box>
                    </FormGroup>
                </form>
            </Grid>
        );
        else return <> </>
    }


    return (
        <div className="button">
            <Button onClick={toggleNewDate} variant="contained" color="primary">
                Request a date
            </Button>
            <br style={{ margin: "5vh " }} />

            {showLocationPicker()}
        </div>
    )
}

DateRequest.propTypes = {

}

export default DateRequest
