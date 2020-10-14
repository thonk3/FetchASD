import React,{ Component } from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import axios from 'axios';

class DeleteDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false,
        }
        this.handleHideDelete = this.handleHideDelete.bind(this);
        this.handleShowDelete = this.handleShowDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleHideDelete() {
        this.setState({ 
            showDelete: false 
        });
    }

    handleShowDelete() {
        this.setState({ 
            showDelete: true 
        });
    }

    handleDelete(id) {
        axios.post(`/api/date/decline/${id}`)
            .then(
                window.location = '/date'
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
            return(<span>
                    <Button onClick={this.handleShowDelete} color="primary">Delete</Button>
                    {(this.state.showDelete) ?
                    <Dialog open={this.state.showDelete} onClose={this.handleHideDelete} aria-labelledby="alert-dialog-title">
                        <DialogContent>
                            <DialogContentText>Are you sure you want to delete this date?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleHideDelete} color="primary">No</Button>
                        <Button type="submit" onClick={() => this.handleDelete(this.props.obj._id)} color="primary">Yes</Button>
                        </DialogActions>
                    </Dialog> : ''}
                    </span>
            );
    }
}

export default DeleteDialog;