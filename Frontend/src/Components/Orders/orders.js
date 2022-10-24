import React, { useEffect, useState } from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from '@mui/material/Grid';
import './orders.css'

export default function Orders() {
  
  const [orderlist, setorderlist] = React.useState([]);

  const data = {
    roll_number:JSON.parse(localStorage.getItem('data')).data.roll_number,
  };

  useEffect(() =>{
    axios.post('http://localhost:8000/orders', data, {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      setorderlist(res.data)
      console.log(res.data)
    });
    }, [])

  return (
    <div>
      {orderlist.map((row) => (
        <Accordion id={row.order_id} className="height">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* < sx={{ maxWidth: 345 }}> */}
          <Grid container spacing={2}>
          <Grid item xl={6} md={6}>
            <CardMedia
              component="img"
              height="140"
              image={row.picture}
              alt="green iguana"
            />
            </Grid>
          <Grid item xl={6} md={6}>
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {row.product_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row.product_desc}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {row.points}
              </Typography>
            </CardContent>
          </Grid>
            {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
            </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {row.status}
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))}
    </div>
  );
}
