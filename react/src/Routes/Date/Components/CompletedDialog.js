import React,{ Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'

class CompletedDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
        }
        this.handleHideDetails = this.handleHideDetails.bind(this);
        this.handleShowDetails = this.handleShowDetails.bind(this);
    }

    handleHideDetails() {
        this.setState({ 
            showDetails: false 
        });
    }

    handleShowDetails() {
        this.setState({ 
            showDetails: true 
        });
    }

    render() {
            return(
                <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid container item xs={10} sm={8}>{this.props.obj.senderDogID} completed their date with {this.props.obj.receiverDogID}</Grid>
                    <Grid container item xs={10} sm={2}>
                            <Button onClick={this.handleShowDetails} variant="contained">View Details</Button> 
                            {(this.state.showDetails) ?                    
                            <Dialog open={this.state.showDetails} onClose={this.handleHideDetails} aria-labelledby="alert-dialog-title">
                                <DialogTitle id="form-dialog-title"><h3>Completed Date</h3></DialogTitle>
                                <DialogContent>
                                    <DialogContentText><h3>Details</h3></DialogContentText>
                                        <p>{this.props.obj.senderDogID} went out with {this.props.obj.receiverDogID}</p>
                                        <p>When: {new Date(Date.parse(this.props.obj.dateOn)).toLocaleString()}</p>
                                        <p>Where: {this.props.obj.location}</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleHideDetails} color="primary">Close</Button>
                                </DialogActions>
                            </Dialog> : ''}
                    </Grid>
                </Grid>
            );
    }
}

export default CompletedDialog;