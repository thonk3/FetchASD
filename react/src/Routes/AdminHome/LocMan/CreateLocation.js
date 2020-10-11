import React, {Component} from 'react';
import axios from "axios";
import Spinner from '../../../Common/Spinner/Spinner';
import Typography from '@material-ui/core/Typography';

const defaultState = {
    locations: [],
    loading: true
};

class CreateLocation extends Component {
    constructor(props) {
        super(props);
        // sets the state using a spread
        // operator :)
        this.state = { ...defaultState };
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <Typography component="h1" variant="h4" align="center">Create Location</Typography>
            </div>
        )
    }
}

export default CreateLocation;