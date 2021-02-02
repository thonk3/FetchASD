import React, { useState, useEffect } from 'react';
import UserList from './Components/table';
import TextField from '@material-ui/core/TextField';
import Spinner from '../../../components/spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';


const UserMan = (props) => {
  const [input, setInput] = useState('');
  const [userListDefault, setUserListDefault] = useState();
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(true);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  // note: currently not safe
  // move the routes around
  const getData = async () => {
    return await fetch(`/api/users/all`)
      .then(response => response.json())
      .then(users => {
        setUserList(users) 
        setUserListDefault(users)
        setLoading(false)
      });
  }

  const updateInput = (input) => {
    const filtered = userListDefault.filter(user => {
      return user.email.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setUserList(filtered);
  }

  useEffect( () => {getData()},[]);
	  const classes = useStyles();
  return (
    <Container>
      <br/>
      <br/>
      <h2 class="centre-this">Search for a user..</h2>
      <br/> <br/>  
      <TextField class="centre-this"
        id="standard-full-width" 
        fullWidth
        placeholder="Enter the user's email here..."
        variant="outlined"
        value={input} 
        onChange={(e) => updateInput(e.target.value)} />
        <br/>
      <br/>
      {
        loading ?
        <Spinner />
        :
        <div >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <UserList userList={userList}/>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </Container>
  );
}

export default UserMan 