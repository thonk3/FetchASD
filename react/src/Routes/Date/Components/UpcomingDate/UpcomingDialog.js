import React,{ Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import UpdateDialog from './UpdateDialog';
import DeleteDialog from './DeleteDialog';

class UpcomingDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            showUpdate: false,
        }
        this.handleHideDetails = this.handleHideDetails.bind(this);
        this.handleShowDetails = this.handleShowDetails.bind(this);
        this.handleHideUpdate = this.handleHideUpdate.bind(this);
        this.handleShowUpdate = this.handleShowUpdate.bind(this);
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

    updateDialog(list) {	    
        // return list.map((data, i) => {	      
        //     return <UpdateDialog obj={data} key={i} />;	        
        // });
        return <UpdateDialog obj={list} />;
    }

    deleteDialog(list) {	    
        // return list.map((data, i) => {	      
        //     return <UpdateDialog obj={data} key={i} />;	        
        // });
        return <DeleteDialog obj={list} />;
    }

    render() {
            return(
                <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid container item xs={10} sm={8}>{this.props.obj.senderDog.name} will be going on a date with {this.props.obj.receiverDog.name}</Grid>
                    <Grid container item xs={10} sm={2}>
                            <Button onClick={this.handleShowDetails} variant="contained">View Details</Button> 
                            {(this.state.showDetails) ?                    
                            <Dialog open={this.state.showDetails} onClose={this.handleHideDetails} aria-labelledby="alert-dialog-title">
                                <DialogTitle id="form-dialog-title">Upcoming Date</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Here are the details of your date:</DialogContentText>
                                        <p>{this.props.obj.senderDog.name} is going out with {this.props.obj.receiverDog.name}</p>
                                        <p><b>When: </b>{new Date(Date.parse(this.props.obj.dateOn)).toLocaleString('en-US')}</p>
                                        <p><b>Where: </b>{this.props.obj.location}</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleHideDetails} color="primary">Close</Button>
                                    {/* <Button onClick={this.handleShowUpdate} color="primary">Update</Button> */}
                                    {/* {(this.state.showUpdate) ? this.updateDialog(this.props.obj) : ''} */}
                                    {this.updateDialog(this.props.obj)}
                                    {this.deleteDialog(this.props.obj)}
                                    {/* <Button  color="primary">Delete</Button> */}
                                </DialogActions>
                            </Dialog> : ''}
                    </Grid>
                </Grid>
            );
    }
}

export default UpcomingDialog;