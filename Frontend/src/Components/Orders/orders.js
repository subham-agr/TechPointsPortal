import React, { useEffect, useState } from "react";
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
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./orders.css";

export default function Orders() {
  const steps = ["Ordered", "Dispatched", "Delivered"];

  const [orderlist, setorderlist] = React.useState([]);
  const [order,setorder] = useState(true);
  const [desclist, setdesc] = useState([]);

  const data = {
    roll_number: JSON.parse(localStorage.getItem("data")).data.roll_number,
  };

  const token = JSON.parse(localStorage.getItem('data')).data.token;

  useEffect(() => {
    axios
      .post("http://localhost:8000/orders", data, {headers: {"Content-Type": "application/json", "Authorization": `Token ${token}`}})
      .then((res) => {
        setorderlist(res.data);
        // console.log(res.data);
        setdesc(res.data.sort((a,b) => 
        (a.product_id>b.product_id) ? 1 : -1
        ));
      });
  }, []);

  // console.log(orderlist)

  if(orderlist == null){
    setorder(false)
  }

  // console.log(desclist)

  return (
    <div>
      <div className="justify-content">
        <h1>Your Orders</h1>
      </div>
      {orderlist ? (
        <div>
        {desclist.map((row) => {
          if(row.status === "Ordered")
          return <Accordion id={row.order_id} className="height">
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
                    // height="140"
                    className="cardmedia"
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
            <AccordionDetails sx={{py: "5rem"}}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
              ))}
              </Stepper>
              <Typography sx={{pt:"2rem", display: "flex" , justifyContent: "center"}}>You Ordered the Item</Typography>
            </AccordionDetails>
          </Accordion>
          else if(row.status === "Dispatched")
          return <Accordion id={row.order_id} className="height">
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
          <AccordionDetails sx={{py: "5rem"}}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
            ))}
            </Stepper>
            <Typography sx={{color: "orange", pt:"2rem", display: "flex" , justifyContent: "center"}}>Your Order is Dispatched</Typography>
          </AccordionDetails>
        </Accordion>
        return <Accordion id={row.order_id} className="height">
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
        <AccordionDetails sx={{py: "5rem"}}>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
          ))}
          </Stepper>
          <Typography sx={{color: "green", pt:"2rem", display: "flex" , justifyContent: "center"}}>Your Ordered is Delivered</Typography>
        </AccordionDetails>
      </Accordion>
        })}
      </div>
      ):(
        <div className="justify-content">
          <h1>You haven't ordered Anything</h1>
        </div>
      )}
    </div>
  );
}
