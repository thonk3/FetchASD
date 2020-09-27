import React,{ Component } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import axios from 'axios';

class UpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdate: false,
            dateOn: '',
            location: '',
        }
        this.handleHideUpdate = this.handleHideUpdate.bind(this);
        this.handleShowUpdate = this.handleShowUpdate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    onChangeDateOn(e) {
        this.setState({
            dateOn: e.target.value
        })
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        })
    }

    handleHideUpdate() {
        this.setState({ 
            showUpdate: false 
        });
    }

    handleShowUpdate() {
        this.setState({ 
            showUpdate: true 
        });
    }

    handleUpdate(original) {
        const updatedDate = {
            senderDogID: original.senderDogID,
            receiverDogID: original.receiverDogID,
            status: original.status,
            dateOn: this.state.dateOn,
            location: this.state.location
        }
        axios.post(`/api/date/update/${original._id}`, updatedDate)
            .then(
                window.location = '/date'
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
            return(<span>
                    <Button onClick={this.handleShowUpdate} color="primary">Update</Button>
                    {(this.state.showUpdate) ?
                    <Dialog open={this.state.showUpdate} onClose={this.handleHideUpdate} aria-labelledby="alert-dialog-title">
                        <DialogTitle id="form-dialog-title">Date Details</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please note that if you change the details of this date, the other party must accept the updated request</DialogContentText>
                                <p>{this.props.obj.senderDogID} is going out with {this.props.obj.receiverDogID}</p>
                                <TextField
                                    label="Your date will be on"
                                    type="datetime-local"
                                    InputLabelProps={{ shrink: true }}
                                    value={this.state.dateOn}
                                    defaultValue={(this.props.obj.dateOn).substring(0, 16)}
                                    onChange={this.onChangeDateOn.bind(this)}
                                />
                                <br/>
                                <br/>
                                <TextField
                                    label="Location"
                                    value={this.state.location}
                                    defaultValue={this.props.obj.location}
                                    onChange={this.onChangeLocation.bind(this)}

                                />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleHideUpdate} color="primary">Close</Button>
                            <Button onClick={() => this.handleUpdate(this.props.obj)} color="primary">Update</Button>
                        </DialogActions>
                    </Dialog> : ''}
                    </span>
            );
    }
}

export default UpdateDialog;