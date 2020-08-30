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
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        // [theme.breakpoints.up('sm')]: {
        //     marginTop: theme.spacing(10),
        // },
    },
    subtitle: {
        marginTop: theme.spacing(2),
    },
}));

// NONE OF THE STYLING MAKES SENSE
const LandingHero = props => {
    // const { classes } = props;
    const classes = useStyles();

    return (
    <LandingHeroWrapper backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
        <img
            style={{ display: 'none' }}
            src={backgroundImage}
            alt="increase priority"/>
        <Typography align="center" variant="h2"> A Title Thing </Typography>

        <Typography
            align="center"
            variant="h5"
            className={classes.h5}
        >
            something something a sentence
        </Typography>

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
            Discover the experience
        </Typography>
    </LandingHeroWrapper>
    );
}

export default LandingHero;
