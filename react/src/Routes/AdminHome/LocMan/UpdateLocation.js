import React, {Component} from 'react';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import InputBox from './Components/InputBox';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const defaultState = {   
    id: '',
    Name: '',
    Address: '',
    openTime: '00:00',
    closeTime: '23:59',
    isLeashRequired: false,
    hasToliet: false ,
    hasBubbler: false,
    hasParking: false,
    locationImageUrl: '',
    open: false,
    setOpen: false
};

class UpdateLocation extends Component {
    constructor(props) {
        super(props);
        // sets the state using a spread
        // operator :)
        this.state = {
            ...defaultState,
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        // this.setState({
        //     ...this.state
        // });
        // axois request
        axios.get('/api/locations/' + this.state.id)
            .then(res => {
                console.log(res.data)
                // add the dog objects in the dogs state array
                this.setState({ ...res.data });
             })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeName = e => {this.setState({ Name: e.target.value})};
    onChangeAddress = e => {this.setState({ Address: e.target.value})};
    onChangeOpenTime = e => {this.setState({openTime: e.target.value})};
    onChangeCloseTime = e => {this.setState({ closeTime: e.target.value})};
    onChangeLocationImageUrl = e => {this.setState({ locationImageUrl: e.target.value})};
    onChangeIsLeashRequired = e => {this.setState({ isLeashRequired: e.target.checked})};
    onChangeHasToliet = e => {this.setState({ hasToliet: e.target.checked})};
    onChangeHasBubbler = e => {this.setState({ hasBubbler: e.target.checked})};
    onChangeHasParking = e => {this.setState({ hasParking: e.target.checked})};

    onChangeOpen = () => {this.setState({setOpen: true,open: true})};
    onChangeClose = () => {this.setState({setOpen: false,open: false})};

    onSubmitUpdate = e => {
        // Method cancels the event if it is cancelable
        e.preventDefault();
        // Update Location Object via state
        const updatedLocation = {   
            Name: this.state.Name,
            Address: this.state.Address,
            openTime: this.state.openTime,
            closeTime: this.state.closeTime,
            isLeashRequired: this.state.isLeashRequired,
            hasToliet: this.state.hasToliet,
            hasBubbler: this.state.hasBubbler,
            hasParking: this.state.hasParking,
            locationImageUrl: this.state.locationImageUrl
        };

        axios.post('/api/locations/' + this.state.id + '/edit', updatedLocation)
            .then(res =>{
                console.log(res.data)
                window.location = '/admin/loc_man'
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    onSubmitDelete = e => {
        e.preventDefault();
        // Change state to false to close dialog box
        this.setState({
            setOpen: false,
            open: false
        });
        
        // Make axois rest to delete the current dog
        axios.post('/api/locations/' + this.state.id + '/delete')
            .then( res => {
                // redirect to main dog management page if successful
                console.log(res.data);
                window.location = '/admin/loc_man';
            })
            // if error display in console
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div>
                <Typography component="h1" variant="h4" align="center">
                    Update Location
                </Typography>
                <form onSubmit={this.onSubmitUpdate}>
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
                <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                    <Button style={{ width: "300px" }} type="submit" variant="contained" color="secondary" onClick={this.onChangeOpen}>Delete Locations</Button>
                </Box>
                <Dialog
                        open={this.state.open}
                        onClose={this.onChangeClose}
                    >
                        <DialogTitle>{"Are you sure you want to delete " + this.state.Name + "? 😢"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Performing this action will completely remove the location from Fetch. Fetch users won't see this as an approved location anymore.
                                This action cannot be undone. Please think wisely before performing this action!
                                </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onSubmitDelete} color="primary">
                                Yes
                                </Button>
                            <Button onClick={this.onChangeClose} color="primary" autoFocus>
                                No
                                </Button>
                        </DialogActions>
                    </Dialog>

            </div>
        )
    }
}

export default UpdateLocation;