import React, { useState, useEffect } from 'react';
import DogList from './Components/DogList';
import './Components/kennel.css';
import TextField from '@material-ui/core/TextField';
import doggo from '../../Assets/doggo.gif'
import Spinner from '../../Common/Spinner/Spinner'

const Kennel = (props) => {
  const [input, setInput] = useState('');
  const [dogListDefault, setDogListDefault] = useState();
  const [dogList, setDogList] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    return await fetch(`/api/dogs`)
      .then(response => response.json())
      .then(dog => {
        setDogList(dog) 
        setDogListDefault(dog)
        setLoading(false)
      });
  }

  const updateInput = (input) => {
    const filtered = dogListDefault.filter(dog => {
      return dog.Suburb.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setDogList(filtered);
  }

  useEffect( () => {getData()},[]);
	
  return (
    <>
{/* <Spinner /> */}
      {/* <img src={doggo} className="spinner" alt='a spinning dog, reaching for his tail - a loading icon.'/> */}
      <br/>
      <h2 class="centre-this">Search for a friend..</h2>
      <br/>
      <TextField class="centre-this"
        id="standard-full-width" 
        fullWidth
        placeholder="Enter your suburb here..."
        variant="outlined"
        value={input} 
        onChange={(e) => updateInput(e.target.value)} />

      {
        loading ?
        <Spinner />
        :
        <div class="flex-container">
          <DogList dogList={dogList}/>
        </div>
        
      }

    </>
  );
}

export default Kennel 






