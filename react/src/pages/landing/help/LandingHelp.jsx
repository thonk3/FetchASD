import React from 'react';

import { Button, Container, Typography } from '@material-ui/core';
import useStyles from './LandingHelp.style';

const Help = ( props ) => {
    const classes = useStyles();

    // redirect to inquiry page
    const clickHelp = () => { window.location = '/newmsg' }

    return (
        <Container className={classes.root} component="section">
            <Button className={classes.button} onClick={clickHelp}>
                <Typography variant="h4" className={classes.bold}>
                    Got any questions? Need help?
                </Typography>
            </Button>
        </Container>
    );
};

export default Help;
