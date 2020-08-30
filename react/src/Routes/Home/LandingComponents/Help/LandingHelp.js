import React from 'react';

import {
    Button, Container, Typography
} from '@material-ui/core';
import useStyles from './LandingHelp.style';
import heart_thing from '../../../../Assets/heart_paw.png';



const LandingHelp = ( props ) => {
    const classes = useStyles();

    return (
        <Container className={classes.root} component="section">
            <Button className={classes.button} onClick={()=> alert("add help form feature in Comms")}>
                <Typography variant="h5">
                    Got any questions? Need help?
                </Typography>
            </Button>
            <Typography className={classes.subtitle}>
                We are here to help. Get in touch!
            </Typography>
            <img
            src={heart_thing}
            className={classes.heartIcon}
            alt="icon"
            />
        </Container>
    );
};


export default LandingHelp;
