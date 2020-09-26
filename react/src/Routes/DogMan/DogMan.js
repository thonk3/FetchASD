import React, { Component } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import token from '../../Helpers/token'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DogCard from './Components/DogCard'
import CreateDog from './CreateDog';
import { Link } from 'react-router-dom';

// This is the default state
// I have hardcoded userEmail as we don't have
// functionality to pass around the _id through
// the app
const defaultState = {
    dogs: [],
    UserId: token().id,
};

class DogMan extends Component {
    constructor(props) {
        super(props);
        // sets the default state using a spread
        // operator :)
        this.state = { ...defaultState };
    }

    // Special function that onLoad
    componentDidMount() {
        // Hardcoded get request the "logged in" user's dogs
        axios.get('/api/users/' + token().id + '/dogs')
            .then(res => {
                // add the dog objects in the dogs state array
                this.setState({
                    dogs: res.data,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <Paper style={{ margin: "10px", padding: "10px" }}>
                    <Typography component="h1" variant="h4" align="center">
                    <span role="img" aria-labelledby="dog">🐶</span> My Pack <span role="img" aria-labelledby="dog">🐶</span>
                    </Typography>
                    <Grid container spacing={2} style={{ marginLeft: 5 }}>
                        {this.state.dogs.map(dog => <DogCard obj={dog} />)}
                    </Grid>
                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                        <Link to={'/myacc/mypack/newdog'} Component={CreateDog}>

                            <Button style={{ width: "300px" }} type="submit" variant="contained" color="primary">
                                Create New Dog
                            </Button>
                        </Link>
                    </Box>
                </Paper>
            </div>
        );
    }

}

export default DogMan;