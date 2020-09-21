import React, { useState, useEffect } from 'react';
import DogList from './Components/DogList';
import './Components/kennel.css';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';




const Kennel = (props) => {
  const [input, setInput] = useState('');
  const [dogListDefault, setDogListDefault] = useState();
  const [dogList, setDogList] = useState();

  const getData = async () => {
    return await fetch(`/api/dogs`)
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

  useEffect( () => {getData()},[]);
	
  return (
    <>
        <br/>
        <h1 class="centre-this">Search for a dog..</h1>
        <br/>


        <TextField class="centre-this"
        id="standard-full-width" 
        fullWidth
        placeholder="Enter your suburb here..."
        variant="outlined"
        value={input} 
        onChange={(e) => updateInput(e.target.value)}>
       
        </TextField>
      
       

        <div class="flex-container">
            <DogList dogList={dogList}/>
        </div>
        
    </>
   );
}

export default Kennel 






