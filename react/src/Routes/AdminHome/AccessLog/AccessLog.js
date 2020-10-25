import React, { useState, useEffect } from 'react';
import LogList from './Components/LogList';
import Spinner from '../../../Common/Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';

const ShowLogs = (props) => {
  const [logList, setLogList] = useState();
  const [loading, setLoading] = useState(true);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  // note: currently not safe
  // move the routes around
  const getData = async () => {
    return await fetch(`/api/auth/all`)
      .then(response => response.json())
      .then(logs => {
        setLogList(logs) 
        setLoading(false)
      });
  }


  useEffect( () => {getData()},[]);
	  const classes = useStyles();
  return (
    <Container>
      <br/>
      <br/>
      <h2 class="centre-this">User Access Logs</h2>
      <br/> <br/>  
      <br/>
      {
        loading ?
        <Spinner />
        :
        <div >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <LogList logList={logList}/>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </Container>
  );
}

export default ShowLogs; 