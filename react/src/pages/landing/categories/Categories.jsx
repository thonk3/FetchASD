import React from 'react';
import clsx from 'clsx';
import categoryList from './categoryList.json';
import PropTypes from 'prop-types';

import { ButtonBase, Container, Typography } from '@material-ui/core/'
import useStyles from './Categories.css'

/* 
  component for the Category grid of the landing page

  data provided in categoryList.json
  need to suit a specific size for the grid layout
*/

// to render each category based on the passed in props
const Category = (props) => {
  const classes = useStyles();

  const { url, title, width } = props;

  return (
    <ButtonBase
      key={title}
      className={classes.imageWrapper}
      style={{ width: width, }}
    >
      <div
        className={clsx(classes.imageSrc, classes.absoluteStyle)}
        style={{ backgroundImage: `url(${url})` }}
      />

      <div className={clsx(classes.imageBackdrop, classes.absoluteStyle)} />

      <div className={clsx(classes.imageButton, classes.absoluteStyle)}>
        <Typography
          component="h3"
          variant="h6"
          color="inherit"
          className={classes.imageTitle}
        >
          {title}
          <div className={classes.imageMarked} />
        </Typography>
      </div>
    </ButtonBase>
  )
}

Category.propType = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}

// --------------------------------------------------------------------------------
const Categories = (props) => {
  const classes = useStyles();

  // render list of categories
  const renderCategories = () =>
    categoryList.map((data, i) =>
      <Category key={i} url={data.url} title={data.title} width={data.width} />);

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For dogs of all shapes and sizes.
      </Typography>

      <div className={classes.images}>
        {renderCategories()}
      </div>
    </Container>
  );
};

export default Categories;
