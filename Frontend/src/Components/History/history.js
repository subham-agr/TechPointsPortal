import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./history.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

export default function History() {
  const [transactionlist, settransaction] = React.useState([]);
  const [history, sethistory] = useState(true);
  const [desclist, setdesc] = useState([]);
  const data = {
    roll_number: JSON.parse(localStorage.getItem("data")).data.roll_number,
  };

  const token = JSON.parse(localStorage.getItem('data')).data.token;

  // console.log(JSON.parse(localStorage.getItem('data')).data.roll_number)
  // const isntpoint = true;
  useEffect(() => {
    axios
      .post("http://localhost:8000/transactions", data, {headers: {"Content-Type": "application/json", "Authorization": `Token ${token}`}})
      .then((res) => {
        settransaction(res.data);
        setdesc(res.data.sort((a,b) => 
        (a.product_id>b.product_id) ? 1 : -1
        ));
      });
  }, []);

  if (transactionlist === null) {
    sethistory(false);
  }

  // console.log(transactionlist[0].earned)

  // console.log(transactionlist.length)

  // if(transactionlist[0].earned===true){
  //   var element = document.getElementById(transactionlist[0].transaction_id);
  //   element.classList.add("bggreen")
  // }
  // else if(transactionlist[0].earned===false){
  //   var element1 = document.getElementById(transactionlist[0].transaction_id);
  //   element1.classList.add("bgred")
  // }
  // console.log(transactionlist[0].event_product_name)
  // console.log(transactionlist[0].event_product_name)

  return (
    <div>
      {history ? (
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Transaction Id</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Points</StyledTableCell>
                {/* <StyledTableCell >Status</StyledTableCell> */}
                <StyledTableCell>Event/Item-Name</StyledTableCell>
                <StyledTableCell>Remarks</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {desclist.map((row) => {
                if (row.earned)
                  return (
                        <TableRow
                          key={row.transaction_id}
                          id={row.transaction_id}
                          // className={`table-row${isearn.current ? " bggreen" : " bgred"}`}
                          className="table-row bggreen"
                        >
                          <StyledTableCell
                            className="green"
                            component="th"
                            scope="row"
                          >
                            {row.transaction_id}
                          </StyledTableCell>
                          <StyledTableCell className="green">
                            {row.date}
                          </StyledTableCell>
                          <StyledTableCell className="green">
                            {row.time}
                          </StyledTableCell>
                          <StyledTableCell className="green">
                            {row.points}
                          </StyledTableCell>
                          {/* <StyledTableCell >{row.earned}</StyledTableCell> */}
                          <StyledTableCell className="green">
                            {row.event_product_name}
                          </StyledTableCell>
                          <StyledTableCell className="green">
                            {row.remarks}
                          </StyledTableCell>
                        </TableRow>
                  );
                var link = '/dashboard/orders#';
                return (
                      <TableRow
                        key={row.transaction_id}
                        id={row.transaction_id}
                        // className={`table-row${isearn.current ? " bggreen" : " bgred"}`}
                        className="table-row bgred"
                      >
                        <StyledTableCell
                          className="red"
                          component="th"
                          scope="row"
                        >
                          {row.transaction_id}
                        </StyledTableCell>
                        <StyledTableCell className="red">
                          {row.date}
                        </StyledTableCell>
                        <StyledTableCell className="red">
                          {row.time}
                        </StyledTableCell>
                        <StyledTableCell className="red">
                          {row.points}
                        </StyledTableCell>
                        {/* <StyledTableCell >{row.earned}</StyledTableCell> */}
                        <Link to={link} className="links">
                        <StyledTableCell className="red">
                          {row.event_product_name}
                        </StyledTableCell>
                        </Link>
                        <StyledTableCell className="red">
                          {row.remarks}
                        </StyledTableCell>
                      </TableRow>
                  
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="justify-content">
          <h1>No Transactions to show</h1>
        </div>
      )}
    </div>
  );
}
