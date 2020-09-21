
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Dog from '../Dog'
import './kennel.css';

const DogList = ({dogList=[]}) => {
  return (
    <>
    { dogList.map((data,index) => {
        if (data) {
          return (
            <div class="center-this">
            <div key={data.Name}>
               <Card class="dog">
                <CardContent>
                <div class="imgplaceholder">image here
                 </div>
                    <h2>{data.Name}</h2>
                    <p>{data.Breed}, {data.Suburb}</p>
                    <Link to={data._id} Component={Dog}>
                    <Button variant="contained" color="primary" > View Profile </Button>
                    </Link>
                </CardContent> 
            </Card>
	    </div>	
      </div>
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default DogList 