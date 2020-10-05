import React,{ Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'

class CompletedDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDialog: false,
            ratingDialog: false,
        }

        this.toggleDetailDialog = this.toggleDetailDialog.bind(this);
        this.toggleRatingDialog = this.toggleRatingDialog.bind(this)
    }

    toggleDetailDialog = () => {
        this.setState({ detailDialog: !this.state.detailDialog })
        console.log('hello', this.state.detailDialog)
    }
    
    toggleRatingDialog = () => {
        this.setState({ ratingDialog: !this.state.ratingDialog })
    }


    render() {
        return(
            <Grid container direction="row" spacing={1} alignItems="center">
                {/* line comment */}
                <Grid container item xs={10} sm={6}>{this.props.obj.senderDog.name} completed their date with {this.props.obj.receiverDog.name}</Grid>

                {/* buttons containers */}
                <Grid container item xs={2} sm={4} direction="row" alignItems="center">
                    <Grid container item xs={6}>
                        <Button onClick={this.toggleDetailDialog} variant="contained">View Details</Button> 
                    </Grid>
                    <Grid container item xs={6}>
                        <Button variant="contained">Rate</Button>
                    </Grid>
                </Grid>

                {(this.state.detailDialog) ?                    
                <Dialog open={this.state.detailDialog} onClose={this.toggleDetailDialog} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="form-dialog-title"><h3>Completed Date</h3></DialogTitle>
                    <DialogContent>
                        <DialogContentText><h3>Details</h3></DialogContentText>
                            <p>{this.props.obj.senderDog.name} went out with {this.props.obj.receiverDog.name}</p>
                            <p>When: {new Date(Date.parse(this.props.obj.dateOn)).toLocaleString('en-US')}</p>
                            <p>Where: {this.props.obj.location}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleDetailDialog} color="primary">Close</Button>
                    </DialogActions>
                </Dialog> : ''}

                </Grid>
            );
    }
}

export default CompletedDialog;