import React, { useState, useEffect } from 'react';

import DogList from './DogList';
import Spinner from '../../components/spinner/Spinner'
import { Container, TextField } from '@material-ui/core';
import './kennel.css';

const Kennel = (props) => {
  const { filterText, onFilterChange, dogList, loading } = props;
	
  return (
    <>
{/* <Spinner /> */}
      {/* <img src={doggo} className="spinner" alt='a spinning dog, reaching for his tail - a loading icon.'/> */}
      <br/>
      <h2 className="centre-this">Search for a friend..</h2>
      <br/>
      <Container>
      <TextField
        fullWidth
        placeholder="Enter your suburb here..."
        variant="outlined"
        value={filterText} 
        onChange={onFilterChange} />
      </Container>

      {
        loading ?
        <Spinner />
        :
        <div className="flex-container">
          <DogList dogList={dogList}/>
        </div>
      }
    </>
  );
}

export default Kennel 






