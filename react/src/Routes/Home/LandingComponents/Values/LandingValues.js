import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';


import heart_thing from '../../../../Assets/heart_paw.png';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  image: {
    height: 40,
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  // curvyLines: {
  //   pointerEvents: 'none',
  //   position: 'absolute',
  //   top: -180,
  // },
}));

function ProductValues(props) {
//   const { classes } = props;
    const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/* <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */}
        <Grid container spacing={5}>
          {/* Chuck these in seperate components */}
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={heart_thing}
                alt="icon"
              />
              <Typography variant="h6" className={classes.title}>
                title thing
              </Typography>
              <Typography variant="h5">
                what is this why is this so weird
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={heart_thing}
                alt="icon"
              />
              <Typography variant="h6" className={classes.title}>
                title thing
              </Typography>
              <Typography variant="h5">
                what is this why is this so weird
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={heart_thing}
                alt="icon"
              />
              <Typography variant="h6" className={classes.title}>
                title thing
              </Typography>
              <Typography variant="h5">
                what is this why is this so weird
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default ProductValues;
