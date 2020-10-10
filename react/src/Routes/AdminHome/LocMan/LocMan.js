/* Location management component */

import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

const defaultState = {
    parks: [],
    loading: true
};


class LocMan extends Component {
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
                 <Typography component="h1" variant="h4" align="center">
                    <span role="img" aria-labelledby="park">🏞</span> Location Management <span role="img" aria-labelledby="park">🏞</span>
                </Typography>
            </div>
        )
    }
}

export default LocMan
