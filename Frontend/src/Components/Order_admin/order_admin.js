import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './order_admin.css'
import axios from "axios";
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Order_Admin() {

  const [order_adminlist, setorder_admin] = React.useState([]);

  useEffect(() =>{
  axios.get('http://localhost:8000/order_admin', {headers: {"Content-Type": "application/json"}})
  .then((res) => {
    setorder_admin(res.data)
    console.log(res.data)
  });
  }, [])

  function handleClick(event) {
    // console.log(event.target.id)
    const data = {
      order_id:JSON.parse(event.target.id)
    };
    axios.post('http://localhost:8000/order_admin',data, {headers: {"Content-Type": "application/json"}})
  .then((res) => {
    // setorder_admin(res.data)
    console.log(res)
  });

  window.location.reload(true);
  }

  return (
    <div className='margin'>
      <div className='heading'>
      <h1>ORDER STATUS PAGE ADMIN</h1>
      </div>
      <TableContainer className='table' component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell >Points</StyledTableCell>
            <StyledTableCell >Product Id</StyledTableCell>
            <StyledTableCell >Product Name</StyledTableCell>
            <StyledTableCell >Status</StyledTableCell>
            <StyledTableCell >
              Change Status
            </StyledTableCell>
            {/* <StyledTableCell >Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {order_adminlist.map((row) => (
            <StyledTableRow key={row.order_id}>
              <StyledTableCell component="th" scope="row">
                {row.order_id}
              </StyledTableCell>
              <StyledTableCell >{row.points}</StyledTableCell>
              <StyledTableCell >{row.product_id}</StyledTableCell>
              <StyledTableCell >{row.product_name}</StyledTableCell>
              <StyledTableCell >{row.status}</StyledTableCell>
              <StyledTableCell >
                <Button id={row.order_id} onClick={handleClick}>Change Status</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
