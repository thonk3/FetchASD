import React,{ Component } from 'react';

import DialogContainer from '../DialogContainer'
import UpdateDialog from './UpdateDialog';
import DeleteDialog from './DeleteDialog';

class UpcomingDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            showUpdate: false,
        }
        // this.handleHideDetails = this.handleHideDetails.bind(this);
        // this.handleShowDetails = this.handleShowDetails.bind(this);

        this.toggleDetails = this.toggleDetails.bind(this);
        this.handleHideUpdate = this.handleHideUpdate.bind(this);
        this.handleShowUpdate = this.handleShowUpdate.bind(this);
    }

    toggleDetails = () =>
        this.setState({ showDetails: !this.state.showDetails })

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
        const { date, toggleDialog, activeState } = this.props;

        return(
            <DialogContainer
                activeState={activeState} toggleDialog={toggleDialog}
                dialogTitle="Upcoming Date"
                contentTitle="Here are the details of your date:"
                actionsButtons={<>
                    {this.updateDialog(date)}
                    {this.deleteDialog(date)}
                </>}
            >
                <p>{date.senderDog.name} is going out with {date.receiverDog.name}</p>
                <p><b>When: </b>{new Intl.DateTimeFormat("en-AU", { 
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(date.dateOn))} at {new Intl.DateTimeFormat("en-AU", { 
                                    hour: "numeric",
                                    minute: "numeric",
                                    timeZone: "Australia/Sydney",
                                    timeZoneName: "short"
                                }).format(new Date(date.dateOn))}</p>
                <p><b>Where: </b>{date.location}</p>
            </DialogContainer>
        );
    }
}

export default UpcomingDialog;