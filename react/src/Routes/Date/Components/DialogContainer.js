/* 
    Component handling dialogs for Date
*/

import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

const DialogContainer = props => {
    const { 
        dialogTitle,
        openStatus,
        toggleDialog,
        contentTitle,
        actionsButtons
    } = props;


    return (
        <>
            {
                openStatus ?            
                <Dialog open={openStatus} onClose={toggleDialog}>
                    <DialogTitle>
                        {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        {/* should change this to h3? */}
                        <DialogContentText>{contentTitle}</DialogContentText>

                        {props.children}

                        <DialogActions>
                            <Button onClick={toggleDialog} color="primary">Close</Button>
                            {actionsButtons}
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                :
                <></>
            }
        </>
    )
}

export default DialogContainer;