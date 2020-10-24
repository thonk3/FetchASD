import React from "react";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import User from "./UserPage";

const DogList = ({ dogList = [] }) => {
  return (
    <>
      {dogList.map((data, index) => {
        if (data) {
          return (
            <div>
              <TableRow key={data.firstName}>
                <TableCell>{data.firstName}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>
                  <Link to={data._id} Component={User}>
                    <Button variant="contained" color="primary">
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

export default DogList;
