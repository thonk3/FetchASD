
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
const DogList = ({dogList=[]}) => {
     const classes = useStyles();
  return (
    <>
    
               
    { dogList.map((data,index) => {
        if (data) {
          return (
              <div>


 
                  <TableRow key={data.firstName}>
                    <TableCell>
                    {data.firstName}
                    </TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell><Link to={data._id} /*Component={User}*/class="viewProfile">
                    <Button  variant="contained" color="primary" > View Profile </Button>
                    </Link></TableCell>
                  </TableRow>

            

         
          
	    </div>	
     
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default DogList 