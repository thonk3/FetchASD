import React, {Component} from 'react';
import axios from "axios";
import Spinner from '../../../Common/Spinner/Spinner';
import Typography from '@material-ui/core/Typography';
import InputBox from './Components/InputBox';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const defaultState = {
    newLocation: {    
        Name: '',
        Address: '',
        openTime: '',
        closeTime: '',
        isLeashRequired: false,
        hasToliet: false,
        hasBubbler: false,
        hasParking: false,
        locationImageUrl: ''
    },
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
            ...this.state,
            loading: false
        });
    }

    onChangeName = e => {this.setState({ newLocation: {...this.state.newLocation, Name: e.target.value}})};
    onChangeAddress = e => {this.setState({ newLocation: {...this.state.newLocation, Address: e.target.value}})};
    onChangeOpenTime = e => {this.setState({ newLocation: {...this.state.newLocation, openTime: e.target.value}})};
    onChangeCloseTime = e => {this.setState({ newLocation: {...this.state.newLocation, closeTime: e.target.value}})};
    onChangeLocationImageUrl = e => {this.setState({ newLocation: {...this.state.newLocation, locationImageUrl: e.target.value}})}
    onChangeIsLeashRequired = e => {this.setState({ newLocation: {...this.state.newLocation, isLeashRequired: e.target.checked}})};
    onChangeHasToliet = e => {this.setState({ newLocation: {...this.state.newLocation, hasToliet: e.target.checked}})};
    onChangeHasBubbler = e => {this.setState({ newLocation: {...this.state.newLocation, hasBubbler: e.target.checked}})};
    onChangeHasParking = e => {this.setState({ newLocation: {...this.state.newLocation, hasParking: e.target.checked}})};

    onSubmit = e => {}

    render() {
        return (
            <div>
                <Typography component="h1" variant="h4" align="center">
                    Create Location
                </Typography>
                {
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
                                control={<Checkbox color="primary" checked={this.state.hasBubbler} onChange={this.onChangeHasBubbler} />}
                                label="Bubbler?"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.hasParking} onChange={this.onChangeHasParking} />}
                                label="Parking?"
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