import React from 'react';

import {
    Button, Container, Typography
} from '@material-ui/core';
import useStyles from './LandingHelp.style';

const LandingHelp = ( props ) => {
    const classes = useStyles();

    return (
        <Container className={classes.root} component="section">
            <Button className={classes.button} onClick={()=> alert("add help form feature in Comms for report update")}>
                <Typography variant="h4" className={classes.bold}>
                    Got any questions? Need help?
                </Typography>
            </Button>
        </Container>
    );
};

export default LandingHelp;
