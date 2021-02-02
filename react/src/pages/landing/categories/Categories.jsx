import React from 'react';
import clsx from 'clsx';
import categoryList from './categoryList.json';

import { ButtonBase, Container, Typography } from '@material-ui/core/'
import useStyles from './Categories.css'

const Categories = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For dogs of all shapes and sizes.
      </Typography>

      <div className={classes.images}>
        {categoryList.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={clsx(classes.imageSrc, classes.absoluteStyle)}
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className={clsx(classes.imageBackdrop, classes.absoluteStyle)} />
            <div className={clsx(classes.imageButton, classes.absoluteStyle)}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
