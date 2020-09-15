import * as React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Button, Typography } from '@material-ui/core';

import heart_thing from '../../../../Assets/heart_paw.png';

// REMEMBER TO RESIZE AND SHIT
// Maybe try to combine the style stuff with LandingValues
// Alot of this are related

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    margin: theme.spacing(1),
  },
//   curvyLines: {
//     pointerEvents: 'none',
//     position: 'absolute',
//     top: -180,
//     opacity: 0.7,
//   },
  button: {
    marginTop: theme.spacing(4),
  },
}));

const LandingHowItWorks = props => {
//   const { classes } = props;
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <Typography
                variant="h4"
                marked="center"
                className={classes.title}
                component="h2"
                >
                How it works
                </Typography>
                
                <div>
                    <Grid container spacing={5}>
                        {/* chuck the grids into COMMON components */}
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>1.</div>
                                <img
                                    src={heart_thing}
                                    alt="icon"
                                    className={classes.image}/>
                                <Typography variant="h5" align="center"> Find a date </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                            <div className={classes.number}>2.</div>
                                <img
                                    src={heart_thing}
                                    alt="icon"
                                    className={classes.image} />
                                <Typography variant="h5" align="center">
                                    Plan a date
                                </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3.</div>
                                <img
                                    src={heart_thing}
                                    alt="icon"
                                    className={classes.image} />
                                <Typography variant="h5" align="center">
                                    :)
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                    <Button
                        color="primary"
                        size="large"
                        variant="contained"
                        className={classes.button}
                        component="a"
                        href="/register"
                        > Get started
                    </Button>
            </Container>
        </section>
    );
}


export default LandingHowItWorks;
