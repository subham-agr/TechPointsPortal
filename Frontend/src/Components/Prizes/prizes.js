import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '../../static/images/avatar/1.jpeg';
import product_card from './productdata'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import './prizes.css'
import axios from "axios";
// import Grid from '@mui/material/Unstable_Grid2';

export default function Prize() {

  const [page,setpage] = React.useState();
  // var page1 = 12*page;
  // function importAll(r) {
  //   let images = {};
  //   r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  //   return images;
  // }

  // const images = importAll(require.context('../../static/images/logo', false, '/\.jpg/'));

  const [productslist, setlist] = React.useState([]);
  var pages = productslist.length/12+1;

  useEffect(() =>{
    axios
  .get('http://127.0.0.1:8000/products', {headers: {"Content-Type": "application/json"}})
  .then((res) => {
  // console.log(res.data)
  setlist(res.data)
  // console.log(res.data[0].product_picture)
  });
  }, [])

  function handleClick(event) {
    const data = {
      roll_number:JSON.parse(localStorage.getItem('data')).data.roll_number,
      product_id:JSON.parse(JSON.stringify(event.target.id))
    };

      axios
    .post('http://127.0.0.1:8000/products',data, {headers: {"Content-Type": "application/json"}})
    .then((res) => {
    console.log(res)
    // setlist(res.data)
    // console.log(res.data[0].product_picture)
    });
  } 

  const products = productslist.slice(page-12,page).map((item) =>
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
    <Button size="small" id={item.product_id} onClick={handleClick}>Reedem Now</Button>
    {/* <Button size="small">Add to Cart</Button> */}
  </CardActions>
  </Card>
  </Grid>
  );

  const handleChange = (e, p) => {
    setpage(12*p)
  }

  return (
    <div className="products">
      <Grid container spacing={2}>
          {products}
      </Grid>
      <div className="pagination">
        <Pagination count={pages} color="primary" onChange={handleChange} />
      </div>
    </div>
  );
}
