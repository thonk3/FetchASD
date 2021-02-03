
import React from 'react';
import { Link } from 'react-router-dom';
import token from '../../utils/tokenUtils';

import PropTypes from 'prop-types';
import useStyles from './Kennel.style';
import { 
  Card, CardContent, CardMedia, 
  CardActionArea, CardActions, 
  Typography, Button 
} from '@material-ui/core';

/* 
  component handling rendering the list of all dogs ready to date
*/

// card for each individual dog on the kennel page
const DogCard = (props) => {
  const classes = useStyles();
  const { dID, imgUrl, name, age, breed, suburb } = props;

  return (
    <Card className={classes.dogCard}>
      <CardActionArea>
        <CardMedia component="img"
          alt="cool dog img" image={imgUrl} title="Cool Dog"
          style={{ height: "150px" }} />

        <CardContent>
          <Typography variant="h5" > {name}, {age} </Typography>
          <Typography variant="body2"> {breed}, {suburb} </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Link to={`/${dID}`}>
          <Button variant="contained" color="primary" > View Profile </Button>
        </Link>
        {token.isStaff() ?
          <>
            <Button variant="contained" color="secondary">DELETE DOG</Button>
          </> : <></>
        }
      </CardActions>
    </Card>
  )
}

DogCard.propTypes = {
  dID:  PropTypes.string,
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.number,
  breed: PropTypes.string,
  suburb: PropTypes.string,
}

// --------------------------------------------------------------------------------
// list of dog cards
const KennelList = (props) => {
  const { dogList } = props;

  return dogList.map((data) => 
    <DogCard key={data._id}
      dID={data._id} imgUrl={data.imageUrl}
      name={data.Name} age={data.Age}
      breed={data.Breed} suburb={data.suburb} />);
}

KennelList.propTypes = {
  dogList: PropTypes.array.isRequired,
}

export default KennelList 