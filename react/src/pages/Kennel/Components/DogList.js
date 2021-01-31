
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './kennel.css';
import CardMedia from '@material-ui/core/CardMedia';
import token from '../../../utils/tokenUtils';


const DogList = ({ dogList = [] }) => {

  return (
    <>
      { dogList.map((data, index) => {
        if (data) {
          return (
            <div className="center-this" key={data._id}>
              <Card className="dog">
                <CardContent>
                  <CardMedia component="img" alt="cool dog img" image={data.imageUrl} title="Cool Dog" style={{ height: "150px", marginTop: "5px" }} />
                  <div className="cardtxt">
                    <h2>{data.Name}, {data.Age}</h2>
                    <p>{data.Breed}, {data.Suburb}</p>
                  </div>
                  <Link to={data._id}>
                    <Button variant="contained" color="primary" > View Profile </Button>
                  </Link>
                  <br />
                  {token.isStaff() ?
                    <>
                      <br />
                      <Button variant="contained" color="secondary">DELETE DOG</Button>
                    </> : <></>
                  }
                </CardContent>
              </Card>
            </div>
          )
        }
        return null
      })}
    </>
  );
}

export default DogList 