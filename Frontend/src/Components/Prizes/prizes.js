import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "../../static/images/avatar/1.jpeg";
import product_card from "./productdata";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import "./prizes.css";
import axios from "axios";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

// import {Button} from '@mui/material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// import Grid from '@mui/material/Unstable_Grid2';

export default function Prize() {
  const [page, setpage] = React.useState();
  const [open, setopen] = useState(false);
  // var page1 = 12*page;
  // function importAll(r) {
  //   let images = {};
  //   r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  //   return images;
  // }

  // const images = importAll(require.context('../../static/images/logo', false, '/\.jpg/'));

  const [productslist, setlist] = React.useState([]);
  // const [idproduct, setproduct] = useState();
  // var idproduct = useRef();
  var pages = productslist.length / 12 + 1;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        // console.log(res.data)
        setlist(res.data);
        // console.log(res.data[0].product_id)
      });
  }, []);

  function handleClick(event) {
    const data = {
      roll_number: JSON.parse(localStorage.getItem("data")).data.roll_number,
      product_id: JSON.parse(JSON.stringify(event.target.id)),
    };

    // console.log(event);

    if(window.confirm("Do you want to reedem the item?") ){
      axios
      .post("http://127.0.0.1:8000/products", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        // setlist(res.data)
        // console.log(res.data[0].product_picture)
      });
    }
    // setopen(false);
  }

  const handleChange = (e, p) => {
    setpage(12 * p);
  };

  return (
    <div className="products">
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
            placeholder="Search Products Here"
            inputProps={{ "aria-label": "search products" }}
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
      <Grid container spacing={2}>
        {productslist.slice(page - 12, page).map((item) => (
          <Grid item xl={4} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }} key={item.product_id}>
              <CardMedia
                component="img"
                height="140"
                image={item.product_picture}
                alt="Product1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.product_name}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {item.product_desc}
                </Typography>
                <Typography variant="h5" component="h2">
                  {item.points}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button onClick={() => setopen(true)}>Reedem Now</Button> */}
                <Button size="small" id={item.product_id} onClick={handleClick}>
                  Reedem Now
                </Button>
                {/* <Dialog open={open} onClose={() => setopen(false)}>
                  <DialogTitle>Submit the Request?</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to reedem this product?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setopen(false)}>Cancel</Button>
                    <Button
                      id={idproduct}
                      autoFocus
                      onClick={handleClick}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog> */}
                {/* <Button size="small">Add to Cart</Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="pagination justify-content">
        <Pagination count={pages} color="primary" onChange={handleChange} />
      </div>
    </div>
  );
}
