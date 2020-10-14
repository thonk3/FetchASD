import React, { useState, useEffect } from 'react';
import DogList from './Components/table';
import TextField from '@material-ui/core/TextField';
import Spinner from '../../../Common/Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const UserMan = (props) => {
  const [input, setInput] = useState('');
  const [dogListDefault, setDogListDefault] = useState();
  const [dogList, setDogList] = useState();
  const [loading, setLoading] = useState(true);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const getData = async () => {
    return await fetch(`/api/users/all`)
      .then(response => response.json())
      .then(users => {
        setDogList(users) 
        setDogListDefault(users)
        setLoading(false)
      });
  }

  const updateInput = (input) => {
    const filtered = dogListDefault.filter(user => {
      return user.firstName.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setDogList(filtered);
  }

  useEffect( () => {getData()},[]);
	  const classes = useStyles();
  return (
    <>
{/* <Spinner /> */}
      {/* <img src={doggo} className="spinner" alt='a spinning dog, reaching for his tail - a loading icon.'/> */}
      <br/>
      <h2 class="centre-this">Search for a user..</h2>
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
        <div >
                        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">

              <TableBody>
          <DogList dogList={dogList}/>
          </TableBody>
            </Table>
          </TableContainer>
        </div>
        
      }

    </>
  );
}

export default UserMan 