import * as React from 'react';
import PropTypes from 'prop-types';

import LandingHeroWrapper from './HeroWrapper';
import { Button, Typography } from '@material-ui/core';
import useStyles from './Hero.style';

/* 
    Hero component for Hero page
*/

// Small component for the buttons on the Landing Hero component
const LandingButton = (props) => {
    const classes = useStyles();

    const { color, text, href } = props;
    return <Button
        color={color}
        variant="contained"
        size="large"
        className={classes.cButton}
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
const LandingHero = (props) => {
    const classes = useStyles();

    return (
        <LandingHeroWrapper backgroundClassName={classes.cBackground}>
            {/* title */}
            <Typography className={classes.cWebTitle} align="center" variant="h2" > FETCH. </Typography>
            <Typography align="center" variant="h5" className={classes.cH5}> Nobody deserves to be lonely!</Typography>

            {/* links button */}
            <LandingButton color="primary" href="/login/" text="Login" />
            <LandingButton color="secondary" href="/register/" text="Register" />

            <Typography variant="body2" className={classes.cSubtitle}>
                Find your best friend a best friend.
            </Typography>
        </LandingHeroWrapper>
    );
}

export default LandingHero;


