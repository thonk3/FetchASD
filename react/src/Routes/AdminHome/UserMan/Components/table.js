import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Axios from "axios";
// import User from "./UserPage";

const handleDelete = data => {

  console.log(data)
  Axios.delete('/api/users/'+data).then(()=> window.location ="/admin/user_man")
}


const UserList = ({ userList = [] }) => {
  return (
    <>

      {userList.map((data, index) => {
        if (data) {
          return (
            <div>
              <TableRow style={{ minWidth: 200 }} key={data.firstName}>
                <TableCell style={{ minWidth: 200 }} >{data.firstName} {data.lastName}</TableCell>
                <TableCell style={{ minWidth: 300 }} >{data.email}</TableCell>
                <TableCell style={{ minWidth: 100 }}>
                  <Button variant="contained" color="secondary" onClick={()=> handleDelete(data._id)}>
                        Delete
                  </Button>
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  <Link to={data._id}  style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" >
                      {" "}
                      View Profile{" "}
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default UserList;
