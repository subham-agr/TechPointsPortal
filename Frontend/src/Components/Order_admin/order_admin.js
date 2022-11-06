import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./order_admin.css";
import axios from "axios";
import { Button } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Order_Admin() {
  if (localStorage.getItem("techpointsadmin_token") === null) {
    window.location.replace("http://localhost:3000/admin_login");
  }

  const [order_adminlist, setorder_admin] = React.useState([]);
  const [isordered, setordered] = useState(false);
  const [isdispatched, setdisptached] = useState(true);
  const [isdelivered, setdelivered] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const token = JSON.parse(localStorage.getItem("data")).data.token;

  const admin_token = localStorage.getItem("techpointsadmin_token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/order_admin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${admin_token}`,
        },
      })
      .then((res) => {
        setorder_admin(res.data);
        console.log(res.data);
      });
  }, []);

  function handleClick(event) {
    // console.log(event.target.id)
    const data = {
      order_id: event.target.id,
      tentative: value,
    };
    if (value === null) {
      alert("Please fill the Tentative Delivery");
    } else {
      axios
        .post("http://localhost:8000/order_admin", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${admin_token}`,
          },
        })
        .then((res) => {
          // setorder_admin(res.data)
          console.log(res);
        });
      window.location.reload(true);
    }
  }

  function handleClick1(event) {
    // console.log(event.target.id)
    const data = {
      order_id: event.target.id,
    };
    axios
      .post("http://localhost:8000/order_admin", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${admin_token}`,
        },
      })
      .then((res) => {
        // setorder_admin(res.data)
        console.log(res);
      });
    window.location.reload(true);
  }

  function handleOrder(event) {
    setordered(true);
    setdisptached(false);
    handleClick(event);
    // window.location.reload(true);
  }

  function handleDispatch(event) {
    setdisptached(true);
    setdelivered(false);
    handleClick(event);
    window.location.reload(true);
  }

  function handleDeliver(event) {
    setdelivered(true);
    handleClick(event);
    window.location.reload(true);
  }

  const [value, setValue] = React.useState(null);
  // const [isdisable, setdisable] = React.useState(true)
  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  function Logout() {
    localStorage.removeItem("techpointsadmin_token");
    window.location.replace("http://localhost:3000/admin_login");
  }

  return (
    <div className="margin">
      <div className="heading">
        <h1>ORDER STATUS PAGE ADMIN</h1>
      </div>
      <div className="searchbar">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search with Product Id"
            inputProps={{ "aria-label": "search products" }}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <DirectionsIcon />
          </IconButton> */}
        </Paper>
      </div>
      <div>
        <Button onClick={Logout}>Logout</Button>
      </div>
      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Points</StyledTableCell>
              <StyledTableCell>Product Id</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Delivery Date</StyledTableCell>
              <StyledTableCell>Change Status</StyledTableCell>
              {/* <StyledTableCell>Ordered</StyledTableCell>
              <StyledTableCell>Dispatched</StyledTableCell>
              <StyledTableCell>Delivered</StyledTableCell>
              <StyledTableCell >Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {order_adminlist
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.product_id
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((row) => (
                <StyledTableRow key={row.order_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.order_id}
                  </StyledTableCell>
                  <StyledTableCell>{row.points}</StyledTableCell>
                  <StyledTableCell>{row.product_id}</StyledTableCell>
                  <StyledTableCell>{row.product_name}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  {/* <StyledTableCell>
                  <Button id={row.order_id} disabled={isordered} onClick={handleOrder}>
                    Ordered
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button id={row.order_id} disabled={isdispatched} onClick={handleDispatch}>
                    Dispatched
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button id={row.order_id} disabled={isdelivered} onClick={handleDeliver}>
                    Delivered
                  </Button>
                </StyledTableCell> */}
                  {row.status === "Redeemed" ? (
                    <StyledTableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Tentative Delivery"
                          inputFormat="MM/DD/YYYY"
                          value={value}
                          onChange={handleChange}
                          disabled={false}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Tentative Delivery"
                          inputFormat="MM/DD/YYYY"
                          value={value}
                          onChange={handleChange}
                          disabled
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </StyledTableCell>
                  )}
                  <StyledTableCell>
                    {row.status === "Redeemed" ? (
                      <Button id={row.order_id} onClick={handleClick}>
                        Change Status
                      </Button>
                    ) : (
                      <Button id={row.order_id} onClick={handleClick1}>
                        Change Status
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
