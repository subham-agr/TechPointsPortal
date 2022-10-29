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
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./history.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, onPageChange } = props;

  // const handleFirstPageButtonClick = (event) => {
  //   onPageChange(event, 0);
  // };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  // const handleLastPageButtonClick = (event) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton> */}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / 10) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  // rowsPerPage: PropTypes.number.isRequired,
};

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
  const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transactionlist, settransaction] = React.useState([]);
  const [history, sethistory] = useState(true);
  const [desclist, setdesc] = useState([]);
  const data = {
    roll_number: JSON.parse(localStorage.getItem("data")).data.roll_number,
  };

  const token = JSON.parse(localStorage.getItem("data")).data.token;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // console.log(JSON.parse(localStorage.getItem('data')).data.roll_number)
  // const isntpoint = true;
  useEffect(() => {
    axios
      .post("http://localhost:8000/transactions", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        settransaction(res.data);
        console.log(res.data);
        setdesc(
          res.data.sort((a, b) => (a.product_id > b.product_id ? 1 : -1))
        );
      });
  }, []);

  if (transactionlist === null) {
    sethistory(false);
  }

  var count = desclist.length;
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
              {desclist.slice(page * 10, page * 10 + 10).map((row) => {
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
                var link = "/dashboard/orders#" + String(row.order_id);
                return (
                  <TableRow
                    key={row.transaction_id}
                    id={row.transaction_id}
                    // className={`table-row${isearn.current ? " bggreen" : " bgred"}`}
                    className="table-row bgred"
                  >
                    <StyledTableCell className="red" component="th" scope="row">
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  count={count}
                  rowsPerPage={10}
                  page={page}
                  // SelectProps={{
                  //   inputProps: {
                  //     'aria-label': 'rows per page',
                  //   },
                  //   native: true,
                  // }}
                  rowsPerPageOptions={[]}
                  onPageChange={handleChangePage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
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
