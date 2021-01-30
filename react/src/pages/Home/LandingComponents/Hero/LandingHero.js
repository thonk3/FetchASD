import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LandingHeroWrapper from './LandingHeroWrapper';
import { Button, Typography } from '@material-ui/core';

const backgroundImage = 'https://ruffinwranglers.com/wp-content/uploads/playing-puppies-790638_1920.jpg';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
        margin: 10,
    },
    h5: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        // [theme.breakpoints.up('sm')]: {
        //     marginTop: theme.spacing(10),
        // },
    },
    subtitle: {
        marginTop: theme.spacing(2),
    },

    webTitle: {
        fontWeight:"bold",
        fontStyle:"italic",
        
    },
}));

const LandingHero = props => {
    const classes = useStyles();

    return (
        <LandingHeroWrapper backgroundClassName={classes.background}>
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="dogs"/>
            <Typography className={classes.webTitle} align="center" variant="h2" > FETCH. </Typography>

            <Typography
                align="center"
                variant="h5"
                className={classes.h5}
            >
                Nobody deserves to be lonely!
            </Typography>

            {/* redir to register page */}
            <Button
                color="primary"
                variant="contained"
                size="large"
                className={classes.button}
                component="a"
                href="/login/"
            >
                Login
            </Button>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                component="a"
                href="/register/"
            >
                Register
            </Button>

            <Typography variant="body2" className={classes.subtitle}>
                Find your best friend a best friend.
            </Typography>
        </LandingHeroWrapper>
    );
}

export default LandingHero;
