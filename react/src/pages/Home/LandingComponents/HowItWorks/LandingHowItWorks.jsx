import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Button, Typography } from '@material-ui/core';
import heart_thing from '../../../../assets/heart_paw.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    fontStyle:'italic',
    fontWeight: theme.typography.fontWeightMedium,
  },
  number: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  bold:{
    fontWeight: theme.typography.fontWeightMedium,
}

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
                HOW TO FETCH:
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
                                <Typography variant="h6" align="center" className={classes.bold}> SIGN UP </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                            <div className={classes.number}>2.</div>
                                <img
                                    src={heart_thing}
                                    alt="icon"
                                    className={classes.image} />
                                <Typography variant="h6" align="center" className={classes.bold}>
                                    FIND A DOG
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
                                <Typography variant="h6" align="center" className={classes.bold}>
                                    DATE!
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
