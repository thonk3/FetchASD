import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  images: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexWrap: 'wrap',
  },
  absoluteStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '25vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      background: theme.palette.primary.main
    },
    '&:hover $imageTitle': {
      fontSize: '24px'
    },
  },
  imageButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));
function LandingCategories(props) {

  const classes = useStyles();

  const images = [
    {      url:
      'https://images.unsplash.com/photo-1585072857532-4bffcc57aaee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    title: 'Husky',

      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1558236809-1fcce1bf8f7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      title: 'Pomeranian',
      width: '20%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
      title: 'Corgi',
      width: '40%',
    },
    { url: 'https://images.unsplash.com/photo-1597513494470-9e5e199de58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
  title: 'Beagle',
    width: '38%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1597773139169-9aa0a445936d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      title: 'Shiba Inu',
      width: '38%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1532397476918-0b485c271c7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      title: 'Labrador',
      width: '24%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1599219091426-557c2123a1c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      title: 'Dachshund',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      title: 'Samoyed',
      width: '20%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1589070680566-0ccca496dbf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      title: 'German Shepherd',
      width: '40%',
    },
  ];
  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For dogs of all shapes and sizes.
      </Typography>

      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={clsx(classes.imageSrc, classes.absoluteStyle )}
              style={{ backgroundImage: `url(${image.url})`}}
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

export default LandingCategories;
