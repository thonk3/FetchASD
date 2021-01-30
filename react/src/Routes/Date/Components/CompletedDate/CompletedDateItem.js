import React,{ Component } from 'react';
import { Grid, Button/* , Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions */ } from '@material-ui/core'

// import axios from 'axios'
import RatingDialog from './RatingDialog'
import CompletedDialog from './CompletedDialog'

class CompletedDateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDialog: false,
            ratingDialog: false,
            // forRating: {},
            // rateLoad: true,
        }

        this.toggleDetailDialog = this.toggleDetailDialog.bind(this);
        this.toggleRatingDialog = this.toggleRatingDialog.bind(this);
    }

    // to toggle dialog containers
    toggleDetailDialog = () => {
        this.setState({ detailDialog: !this.state.detailDialog })
        console.log('hello', this.state.detailDialog)
    }
    
    toggleRatingDialog = () => {
        this.setState({ ratingDialog: !this.state.ratingDialog })
        console.log('rating', this.state.ratingDialog)
    }

    // pre load data for rating


    render() {
        return(
            <Grid container direction="row" spacing={1} alignItems="center">
                {/* line comment */}
                <Grid container item xs={10} sm={8}>
                    {this.props.obj.senderDog.name} completed their date with {this.props.obj.receiverDog.name}
                </Grid>

                {/* buttons containers */}
                <Grid container item xs={2} sm={4} direction="row" alignItems="center">
                    <Grid container item xs={6}>
                        <Button onClick={this.toggleDetailDialog} variant="contained">View Details</Button> 
                    </Grid>
                    <Grid container item xs={6}>
                        <Button onClick={this.toggleRatingDialog} variant="contained">Rate</Button>
                    </Grid>
                </Grid>

                {/* Dialogs will only render if activeState is true */}
                <CompletedDialog
                    activeState={this.state.detailDialog}
                    toggleDialog={this.toggleDetailDialog}
                    date={this.props.obj} />

                <RatingDialog
                    activeState={this.state.ratingDialog}
                    toggleDialog={this.toggleRatingDialog}
                    date={this.props.obj}/>

                </Grid>
            );
    }
}

export default CompletedDateItem;