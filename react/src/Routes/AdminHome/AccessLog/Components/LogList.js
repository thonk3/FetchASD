import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const LogList = ({ logList = [] }) => {
  return (
    <>

      {logList.map((data, index) => {
        if (data) {
          return (
            <div>
              <TableRow style={{ minWidth: 200 }} key={data.dateTime}>
                <TableCell style={{ minWidth: 200 }} >{data.dateTime}</TableCell>
                <TableCell style={{ minWidth: 200 }} >{data.email}</TableCell>
                <TableCell style={{ minWidth: 200 }} >{data.password}</TableCell>
                <TableCell style={{ minWidth: 200 }} >{data.logIn}</TableCell>
              </TableRow>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default LogList;
