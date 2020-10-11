import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import UpdateLocation from '../UpdateLocation';

//This is a component for each location that the particular
//user has registered. It makes the amount of location
//dynamically based on the amount of location a user has
//registered
class LocationCard extends Component {
    render() {
        return (
            <div style={{ margin: "10px", padding: "10px" }}>
                <Grid>
                    <Card class="dog" style={{ padding: 5, height: 500, width: "300px" }}>
                        <CardContent>
                        <CardMedia component="img" alt="cool dog img" image={this.props.obj.parkImageUrl} title="Cool Dog" style={{ height: "150px", marginTop: "5px" }} />
                            <h3>{this.props.obj.Name}</h3>
                            <p>{this.props.obj.Address}</p>
                            {this.props.obj.isLeashRequired ? <p>No Leash Option: <span role="img" aria-labelledby="cross-mark">❌</span></p> : <p>No Leash Option: <span role="img" aria-labelledby="check-mark-button">✅</span></p>}
                            {this.props.obj.hasToliet ? <p>Public Toliets:  <span role="img" aria-labelledby="check-mark-button">✅</span></p> : <p>Public Toliets: <span role="img" aria-labelledby="cross-mark">❌</span></p>}
                            {this.props.obj.hasBubbler ? <p>Bubbler:  <span role="img" aria-labelledby="check-mark-button">✅</span></p> : <p>Bubbler: <span role="img" aria-labelledby="cross-mark">❌</span></p>}
                            {this.props.obj.Parking ? <p>Parking:  <span role="img" aria-labelledby="check-mark-button">✅</span></p> : <p>Parking: <span role="img" aria-labelledby="cross-mark">❌</span></p>}
                            <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                                <Link to={'/admin/loc_man/' + this.props.obj._id} Component={UpdateLocation}>
                                    <Button style={{ width: "150px" }} variant="contained" color="primary">Edit Location</Button>
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </div >
        );
    }
}

export default LocationCard;