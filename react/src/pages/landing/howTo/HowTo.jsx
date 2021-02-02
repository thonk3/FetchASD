import * as React from 'react';
import PropTypes from 'prop-types';

import useStyles from './HowTo.style';
import { Grid, Container, Button, Typography } from '@material-ui/core';
import heart_thing from '../../../assets/heart_paw.png';

// list of instructions
const instructions = [
    { "step": 1, "title": "Sign Up", "sub": "Quickly create your best bud's profile." },
    { "step": 2, "title": "Find a Mate", "sub": "Set up Date through us" },
    { "step": 3, "title": "Go on a Date <3" },
];

/* 
    A simple HowTo this app works on the LandingPage
*/

// single step component to be rendered in HowTo
const Step = (props) => {
    const classes = useStyles();
    const { title, sub, step } = props;

    return (
        <Grid item xs={12} md={4}>
            <div className={classes.item}>
                <div className={classes.number}>{step}.</div>
                <img
                    src={heart_thing}
                    alt="icon"
                    className={classes.image} />
                <Typography variant="h6" align="center" className={classes.bold}>{title} </Typography>
                <Typography variant="subtitle1">{sub}</Typography>
            </div>
        </Grid>
    )
}

Step.propTypes = {
    title: PropTypes.string.isRequired,
    sub: PropTypes.string,
    step: PropTypes.number,
}

// --------------------------------------------------------------------------------
const HowTo = props => {
    const classes = useStyles();

    // render instruction list using Step
    const renderSteps = () =>
        instructions.map((data, i) =>
            <Step key={i} step={data.step} title={data.title} sub={data.sub} />);

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <Typography
                    variant="h4"
                    marked="center"
                    className={classes.title}
                    component="h2"
                > HOW TO FETCH: </Typography>

                <Grid container spacing={5}> {renderSteps()} </Grid>

                <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    className={classes.button}
                    href="/register"
                > Get started
                    </Button>
            </Container>
        </section>
    );
}


export default HowTo;
