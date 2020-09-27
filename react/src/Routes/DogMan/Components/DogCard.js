import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import coolDogImage from '../../../Assets/cool.jpg';
import UpdateDog from '../UpdateDog';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

//This is a component for each dog that the particular
//user has registered. It makes the amount of dogs
//dynamically based on the amount of dogs a user has
//registered
class DogCard extends Component {
    render() {
        return (
            <div style={{ margin: "10px", padding: "10px" }}>
                <Grid>
                    <Card class="dog" style={{ padding: 5, height: 370, width: "200px" }}>
                        <CardContent>
                            <CardMedia component="img" alt="cool dog img" image={coolDogImage} title="Cool Dog" style={{ height: "150px", marginTop: "5px" }} />
                            <h3>{this.props.obj.Name}, {this.props.obj.Age}</h3>
                            <p>{this.props.obj.Breed}</p>
                            <p>{this.props.obj.Suburb}, {this.props.obj.Postcode}</p>
                            <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <Link to={'/myacc/mypack/' + this.props.obj._id} Component={UpdateDog}>
                                <Button style={{ width: "100px" }} variant="contained" color="primary">Edit Dog</Button>
                            </Link>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </div >
        );
    }
}

export default DogCard;