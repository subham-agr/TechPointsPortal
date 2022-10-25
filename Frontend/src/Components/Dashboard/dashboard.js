import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import './dashboard.css'
import Grid from '@mui/material/Grid';
import axios from "axios";
import CountUp from 'react-countup'

export default function Dashboard() {

  // let valueDisplays = document.querySelectorAll(".num");
  // let interval = 500;

  // valueDisplays.forEach((valueDisplay) => {
  //   let startvalue = 0;
  //   let endvalue = parseInt(valueDisplay.getAttribute("data-val"));
  //   // console.log(endvalue)
  //   let duration = Math.floor(interval / endvalue);
  //   let counter = setInterval(function () {
  //     startvalue = startvalue + 1;
  //     valueDisplay.textContent = startvalue;
  //     if(startvalue == endvalue-1){
  //       clearInterval(counter);
  //       valueDisplay.textContent = endvalue;
  //     }
  //   }, duration);
  // })

  var [points, setpoint] = useState([]);
  const data = {
    roll_number:JSON.parse(localStorage.getItem('data')).data.roll_number,
  };
  // const isntpoint = true;
    useEffect(() =>{
      axios
    .post('http://127.0.0.1:8000/students', data, {headers: {"Content-Type": "application/json"}})
    .then((res) => {
    points = res.data[0];
    setpoint(res.data[0])
    });
    }, [])
    console.log(points)
  return (
    <div className='content'>
      <div className="points">
        <Grid container className='flex-between'>
          <Grid item xs={4} className="center-align left">
          <h1 className='size'>Current Points</h1>
          <h1 className='size num' data-val={points.total_points}><CountUp end={5000} /></h1>
          </Grid>
          <Grid item xs={4} className="center-align">
          <h1 className='size'>Total Earned</h1>
          <h1 className='size num' data-val={points.points_earned}><CountUp end={points.points_earned} /></h1>
          </Grid>
          <Grid item xs={4} className="center-align right">
          <h1 className='size'>Total Reedemed</h1>
          <h1 className='size num' data-val={points.points_redeemed}><CountUp end={points.points_redeemed} /></h1>
          </Grid>
        </Grid>
      </div>
      <Typography paragraph>
          Welcome {JSON.parse(localStorage.getItem('data')).data.name}!
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        <Typography>
          Current Points
          Total Earned 
          Total Redemmed
        </Typography>
        <Typography>
          Transaction History
          Details Earned: sr no. Event/Competetion Standing Points-Earned Total
          Redeemed Details: Sr No. Item type Price Date/Time Status Total
        </Typography>
        <Typography>
          Prize catalogue: Photo Item-Name Description Points Redeem Button
        </Typography>
        <Typography>
          Status Page 
          Ordered Received Accepted
        </Typography>
        <Typography>
          Reedem Now Page: List of Items, Filters, Submit Request Alert
        </Typography>
    </div>
  )
}
