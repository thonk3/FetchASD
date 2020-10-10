/* Location management component */
import React, {Component} from 'react';
import axios from "axios";
import Spinner from '../../../Common/Spinner/Spinner';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LocationCard from './Components/LocationCard';

const defaultState = {
    locations: [],
    loading: true
};

class LocMan extends Component {
    constructor(props) {
        super(props);
        // sets the state using a spread
        // operator :)
        this.state = { ...defaultState };
    }

    componentDidMount() {
        this.setState({
            ...this.state
        });
        axios.get('/api/locations/')
            .then(res => {
                this.setState({
                    locations: res.data
                });
            })
            .then(() => this.setState({loading: false}))
            .catch((error) => console.log(error))
    }

    render() {
        return (
            <div>
                 <Typography component="h1" variant="h4" align="center">
                    <span role="img" aria-labelledby="park">🏞</span> Location Management <span role="img" aria-labelledby="park">🏞</span>
                </Typography>

                {
                    this.state.loading ?
                    <Spinner />
                    :
                    <Grid container spacing={2} style={{ marginLeft: 5 }}>
                        {this.state.locations.map(location => <LocationCard obj={location} />)}
                    </Grid>
                }
            </div>
        )
    }
}

export default LocMan
