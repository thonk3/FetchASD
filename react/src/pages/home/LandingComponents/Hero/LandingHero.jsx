import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LandingHeroWrapper from './LandingHeroWrapper';
import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

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
    },
    subtitle: {
        marginTop: theme.spacing(2),
    },
    webTitle: {
        fontWeight: "bold",
        fontStyle: "italic",
    },
}));

// Small component for the buttons on the Landing Hero component
const LandingButton = (props) => {
    const classes = useStyles();

    const { color, text, href } = props;
    return <Button
        color={color}
        variant="contained"
        size="large"
        className={classes.button}
        href={href}
        component="a"
    >   { text } </Button>;
}

LandingButton.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
}

// --------------------------------------------------------------------------------
const LandingHero = props => {
    const classes = useStyles();

    return (
        <LandingHeroWrapper backgroundClassName={classes.background}>
            {/* title */}
            <Typography className={classes.webTitle} align="center" variant="h2" > FETCH. </Typography>
            <Typography align="center" variant="h5" className={classes.h5}> Nobody deserves to be lonely!</Typography>

            {/* links button */}
            <LandingButton color="primary" href="/login/" text="Login" />
            <LandingButton color="secondary" href="/register/" text="Register" />

            <Typography variant="body2" className={classes.subtitle}>
                Find your best friend a best friend.
            </Typography>
        </LandingHeroWrapper>
    );
}

export default LandingHero;


