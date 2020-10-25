import React,{ Component } from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import axios from 'axios';

class MarkCompletedDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleHide() {
        this.setState({ 
            show: false 
        });
    }

    handleShow() {
        this.setState({ 
            show: true 
        });
    }

    handleComplete(id) {
        console.log(id)
        axios.post(`/api/date/complete/${id}`)
            .then(window.location = '/date')
            .catch((error) => console.log(error));
    }

    render() {
            return(<span>
                    <Button onClick={this.handleShow} color="primary">Complete</Button>
                    {(this.state.show) ?
                        <Dialog open={this.state.show} onClose={this.handleHide} aria-labelledby="alert-dialog-title">
                            <DialogContent>
                                <DialogContentText>Do you want to mark this date as completed?</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleHide} color="primary">No</Button>
                                <Button type="submit" onClick={() => this.handleComplete(this.props.obj._id)} color="primary">Yes</Button>
                            </DialogActions>
                        </Dialog> 
                    : ''}
                    </span>
            );
    }
}

export default MarkCompletedDialog;