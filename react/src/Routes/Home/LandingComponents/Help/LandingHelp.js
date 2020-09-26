import React from 'react';

import {
    Button, Container, Typography, Avatar
} from '@material-ui/core';
import useStyles from './LandingHelp.style';
import heart_thing from '../../../../Assets/heart_paw.png';





const LandingHelp = ( props ) => {
    const classes = useStyles();

    return (
        <Container className={classes.root} component="section">
            <Button className={classes.button} onClick={()=> alert("add help form feature in Comms for report update")}>
                <Typography variant="h5">
                    Got any questions? Need help?
                </Typography>
            </Button>
            <Typography className={classes.subtitle}>
                We are here to help. Get in touch! (also find a white img instead) ( also ligher/darker shades of primary/seccondary colors )??
            </Typography>

            <Avatar className={classes.helpAvatar}>
                <img
                    src={heart_thing}
                    className={classes.heartIcon}
                    alt="icon"
                    />
            </Avatar>
 
        </Container>
    );
};


export default LandingHelp;
