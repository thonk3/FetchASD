import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Box, Grid, TextField, Typography } from '@material-ui/core';
import PickLocationCard from '../kennel/PickLocationCard';
import axios from 'axios';

/* 
    Location PIcker component
*/

const LocationPicker = (props) => {
    const { closeLocationSelect, locationSelect } = props;
    const [locationList, setLocationList] = useState([]);

    // filtering
    const [filterTerm, setFilterTerm] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);

    const [isLoading, setIsLoading] = useState(false);



    // --------------------------------------------------------------------------------
    const getLocationList = () => {
        axios.get('/api/locations/')
            .then(res => {
                setLocationList([...res.data]);
                setFilteredLocations([...res.data]);
            })
            .catch((error) => console.log("loading locations err", error));
    }

    useEffect(() => {
        getLocationList();
        setIsLoading(false);
    }, []);
    // --------------------------------------------------------------------------------
    const filterTaste = (val) => val.toLowerCase().includes(filterTerm.toLowerCase());
    const filterLocations = (e) => {
        setFilterTerm(e.target.value);
        setFilteredLocations(
            locationList.filter(loc => filterTaste(loc.Address) || filterTaste(loc.Name))
        )
    }
    // --------------------------------------------------------------------------------

    return (
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
                    {
                        filteredLocations.length
                            ?
                            filteredLocations.map(location => <PickLocationCard obj={location} onChange={(e) => this.onPickLocation(location)} />)
                            :
                            <Typography component="h1" variant="h4" style={{ margin: "1vw" }}>{" No Location Found 😢"}</Typography>
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default LocationPicker
