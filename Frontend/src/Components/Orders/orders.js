import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from 'prop-types';
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
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { createStyles, makeStyles } from '@mui/styles';
import "./orders.css";

export default function Orders() {
  const steps = ["Redeemed", "Ordered", "Dispatched", "Delivered"];

  const [orderlist, setorderlist] = React.useState([]);
  const [order,setorder] = useState(true);
  const [desclist, setdesc] = useState([]);

  const data = {
    roll_number: JSON.parse(localStorage.getItem("data")).data.roll_number,
  };

  const token = JSON.parse(localStorage.getItem('data')).data.token;

  const theme = createTheme({
    components: {
      // Name of the component
      MuiStepper: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // color: 'green',
            '&$completed': {
              color: 'pink',
            },
            '&$active': {
              color: 'red !important',
            },
            iconColor: "green",
          },
        },
      },
    },
  });

  const theme1 = createTheme({
    MuiStepper: {
      iconColor: "green",
    }
  })

  useEffect(() => {
    axios
      .post("http://localhost:8000/orders", data, {headers: {"Content-Type": "application/json", "Authorization": `Token ${token}`}})
      .then((res) => {
        setorderlist(res.data);
        console.log(res.data);
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
          if(row.status === "Redeemed")
          return <Accordion className="height">
            <AccordionSummary
              id={row.order_id}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
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
                    {/* <Typography variant="body2" color="text.secondary">
                      {row.product_desc}
                    </Typography> */}
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
                      <Step key={label}
                      sx={{
                        '& .MuiStepLabel-root .Mui-completed': {
                          color: 'green', // circle color (COMPLETED)
                        },
                        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                          {
                            color: 'grey.500', // Just text label (COMPLETED)
                          },
                        '& .MuiStepLabel-root .Mui-active': {
                          color: 'red', // circle color (ACTIVE)
                        },
                        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                          {
                            color: 'grey.500', // Just text label (ACTIVE)
                          },
                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                          fill: 'black', // circle's number (ACTIVE)
                        },
                      }}
                      >
                        <StepLabel>{label}</StepLabel>
                      </Step>
              ))}
              </Stepper>
              {/* <Typography sx={{pt:"2rem", display: "flex" , justifyContent: "center"}}>Tentative Date of Delivery is {row.tentative}</Typography> */}
              {/* <Typography sx={{pt:"2rem", display: "flex" , justifyContent: "center"}}>You Ordered the Item</Typography> */}
            </AccordionDetails>
          </Accordion>
          else if(row.status === "Ordered")
          return <Accordion className="height">
          <AccordionSummary
            id={row.order_id}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
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
                  {/* <Typography variant="body2" color="text.secondary">
                    {row.product_desc}
                  </Typography> */}
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
                    <Step key={label}
                    sx={{
                      '& .MuiStepLabel-root .Mui-completed': {
                        color: 'green', // circle color (COMPLETED)
                      },
                      '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                        {
                          color: 'grey.500', // Just text label (COMPLETED)
                        },
                      '& .MuiStepLabel-root .Mui-active': {
                        color: 'orange', // circle color (ACTIVE)
                      },
                      '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                        {
                          color: 'grey.500', // Just text label (ACTIVE)
                        },
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                        fill: 'black', // circle's number (ACTIVE)
                      },
                    }}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
            ))}
            </Stepper>
            <Typography sx={{pt:"2rem", display: "flex" , justifyContent: "center"}}>Tentative Date of Delivery is {row.tentative}</Typography>
            {/* <Typography sx={{color: "orange", pt:"2rem", display: "flex" , justifyContent: "center"}}>Your Order is Dispatched</Typography> */}
          </AccordionDetails>
        </Accordion>
          else if(row.status === "Dispatched")
          return <Accordion className="height">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={row.order_id}
          >
            {/* < sx={{ maxWidth: 345 }}> */}
            <Grid container spacing={2}>
              <Grid item xl={6} md={6}>
                <CardMedia
                  component="img"
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
                  {/* <Typography variant="body2" color="text.secondary">
                    {row.product_desc}
                  </Typography> */}
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
                    <Step key={label}
                    sx={{
                      '& .MuiStepLabel-root .Mui-completed': {
                        color: 'green', // circle color (COMPLETED)
                      },
                      '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                        {
                          color: 'grey.500', // Just text label (COMPLETED)
                        },
                      '& .MuiStepLabel-root .Mui-active': {
                        color: 'blue', // circle color (ACTIVE)
                      },
                      '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                        {
                          color: 'grey.500', // Just text label (ACTIVE)
                        },
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                        fill: 'black', // circle's number (ACTIVE)
                      },
                    }}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
            ))}
            </Stepper>
            <Typography sx={{pt:"2rem", display: "flex" , justifyContent: "center"}}>Tentative Date of Delivery is {row.tentative}</Typography>
            {/* <Typography sx={{color: "orange", pt:"2rem", display: "flex" , justifyContent: "center"}}>Your Order is Dispatched</Typography> */}
          </AccordionDetails>
        </Accordion>
        return <Accordion className="height">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={row.order_id}
        >
          {/* < sx={{ maxWidth: 345 }}> */}
          <Grid container spacing={2}>
            <Grid item xl={6} md={6}>
              <CardMedia
                component="img"
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
                {/* <Typography variant="body2" color="text.secondary">
                  {row.product_desc}
                </Typography> */}
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
        <Stepper activeStep={4} alternativeLabel>
          {steps.map((label) => (
                  <Step key={label}
                  sx={{
                    '& .MuiStepLabel-root .Mui-completed': {
                      color: 'green', // circle color (COMPLETED)
                    },
                    '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                      {
                        color: 'grey.500', // Just text label (COMPLETED)
                      },
                    '& .MuiStepLabel-root .Mui-active': {
                      color: 'green', // circle color (ACTIVE)
                    },
                    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                      {
                        color: 'grey.500', // Just text label (ACTIVE)
                      },
                    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                      fill: 'black', // circle's number (ACTIVE)
                    },
                  }}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
          ))}
          </Stepper>
          <Typography sx={{pt:"2rem", display: "flex" , justifyContent: "center"}}>Delivered on {row.change_time}</Typography>
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
