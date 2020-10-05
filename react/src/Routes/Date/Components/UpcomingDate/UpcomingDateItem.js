import React,{ Component } from 'react';
import { Grid, Button } from '@material-ui/core'

import UpcomingDialog from './UpcomingDialog'

class UpcomingDateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
            // showUpdate: false,
            // showDelete: false,
        }

        this.toggleDetailDialog = this.toggleDetailDialog.bind(this);
        // this.toggleUpdateDialog = this.toggleUpdateDialog.bind(this);
        // this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
    }

    toggleDetailDialog = () =>
        this.setState({ showDetails: !this.state.showDetails });
    
    // toggleUpdateDialog = () => {
    //     this.setState({ showUpdate: !this.state.showUpdate })
    //     console.log("updating", this.state.showUpdate)
    // }

    // toggleDeleteDialog = () => {
    //     this.setState({ showDelete: !this.state.showDelete })
    //     console.log("updating", this.state.showDelete)
    // }

    render() {
        return(
            <Grid container direction="row" spacing={1} alignItems="center">
                <Grid container item xs={10} sm={8}>
                    {this.props.obj.senderDog.name} will be going on a date with {this.props.obj.receiverDog.name}
                </Grid>

                <Grid container item xs={10} sm={4}>
                    <Button onClick={this.toggleDetailDialog} variant="contained">View Details</Button> 
                </Grid>

                <UpcomingDialog date={this.props.obj}
                    activeState={this.state.showDetails} toggleDialog={this.toggleDetailDialog}
                    // updateState={this.showUpdate} toggleUpdate={this.toggleUpdateDialog} 
                    // deleteState={this.showDelete} toggleDelete={this.toggleDeleteDialog}
                    />

            </Grid>
        );
    }
}

export default UpcomingDateItem;