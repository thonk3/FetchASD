import React, { useState, useEffect } from 'react';
import DogList from './Components/DogList';
import './Components/kennel.css';
import TextField from '@material-ui/core/TextField';


const Kennel = (props) => {
  const [input, setInput] = useState('');
  const [dogListDefault, setDogListDefault] = useState();
  const [dogList, setDogList] = useState();

  const fetchData = async () => {
    return await fetch(`/api/canines`)
      .then(response => response.json())
      .then(dog => {
         setDogList(dog) 
         setDogListDefault(dog)
       });}

  const updateInput = async (input) => {
     const filtered = dogListDefault.filter(dog => {
      return dog.Suburb.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setDogList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
        <h1>Search for a dog..</h1>

        <TextField 
        id="outlined-basic" placeholder="Location" variant="outlined"
        value={input} 
        onChange={(e) => updateInput(e.target.value)}
        />

        <div class="flex-container">
            <DogList dogList={dogList}/>
        </div>
        
    </>
   );
}

export default Kennel 




