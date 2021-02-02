import React, {Component} from 'react';
import axios from "axios";
import Spinner from '../../../components/spinner/Spinner';
import Typography from '@material-ui/core/Typography';
import InputBox from './Components/InputBox';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

// Default State
const defaultState = {
    // newLocation Object
    newLocation: {    
        Name: '',
        Address: '',
        isLeashRequired: false,
        hasToliet: false,
        hasBubbler: false,
        hasParking: false,
        locationImageUrl: ''
    },
    // state variable used for spinner
    loading: true
};

class CreateLocation extends Component {
    constructor(props) {
        super(props);
        // sets the state using a spread
        // operator :)
        this.state = { ...defaultState };
    }

    componentDidMount() {
        this.setState({
            // set state on firstLoad
            ...this.state,
            // stop spinner once loaded
            loading: false
        });
    }

    // Standard OnChange functions for state
    onChangeName = e => {this.setState({ newLocation: {...this.state.newLocation, Name: e.target.value}})};
    onChangeAddress = e => {this.setState({ newLocation: {...this.state.newLocation, Address: e.target.value}})};
    onChangeOpenTime = e => {this.setState({ newLocation: {...this.state.newLocation, openTime: e.target.value}})};
    onChangeCloseTime = e => {this.setState({ newLocation: {...this.state.newLocation, closeTime: e.target.value}})};
    onChangeLocationImageUrl = e => {this.setState({ newLocation: {...this.state.newLocation, locationImageUrl: e.target.value}})}
    onChangeIsLeashRequired = e => {this.setState({ newLocation: {...this.state.newLocation, isLeashRequired: e.target.checked}})};
    onChangeHasToliet = e => {this.setState({ newLocation: {...this.state.newLocation, hasToliet: e.target.checked}})};
    onChangeHasBubbler = e => {this.setState({ newLocation: {...this.state.newLocation, hasBubbler: e.target.checked}})};
    onChangeHasParking = e => {this.setState({ newLocation: {...this.state.newLocation, hasParking: e.target.checked}})};

    // Function that occurs once create location form is submitted
    onSubmit = e => {
        e.preventDefault();
        const payload = {
            newLocation: this.state.newLocation
        }
        this.setState({ loading: true});
        axios.post('/api/locations/add', payload)    
        .then(res => {
            window.location = '/admin/loc_man';
        })
        .then(() => this.setState({ loading: false }))
        // if error display in console
        .catch((error) => {
            console.log(error);
            this.setState({ loading: false})
        })
    }

    render() {
        return (
            <div>
                <Typography component="h1" variant="h4" align="center">
                    Create Location
                </Typography>
                {
                    // If it is loading do the spinner if not load form
                        this.state.loading ?
                        <Spinner />
                        :
                <form onSubmit={this.onSubmit}>
                    <InputBox label="Name" required value={this.state.Name} onChange={this.onChangeName} />
                    <InputBox label="Address" required value={this.state.Address} onChange={this.onChangeAddress} />
                    <InputBox label="Image URL" required value={this.state.locationImageUrl} onChange={this.onChangeLocationImageUrl} />
                    {/* openTime */}
                    {/* closeTime */}
                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.isLeashRequired} onChange={this.onChangeIsLeashRequired} />}
                                label="Leash Required?"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.hasToliet} onChange={this.onChangeHasToliet} />}
                                label="Toliet?"
                                labelPlacement="start"
                            />
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "center"}}>
                    <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.hasParking} onChange={this.onChangeHasParking} />}
                                label="Parking?"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.hasBubbler} onChange={this.onChangeHasBubbler} />}
                                label="Bubbler?"
                                labelPlacement="start"
                            />
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <Button style={{ width: "300px" }} type="submit" variant="contained" color="primary">Submit</Button>
                    </Box>
                </form>
                }
            </div>
        )
    }
}

export default CreateLocation;