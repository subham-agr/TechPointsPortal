import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import React, { useEffect, useState } from 'react'
import './notifications.css'

export default function MediaCard() {
  const [notificationlist, setnotification] = React.useState([]);
  const data = {
    roll_number: JSON.parse(localStorage.getItem('data')).data.roll_number
  };

  useEffect(() => {
    axios.post('http://localhost:8000/notifs', data, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        setnotification(res.data)
        console.log(res.data)
      });
  }, [])

  // console.log(notificationlist[0])

  return (
    <div className='auto'>
      {notificationlist.map((item) => (
        // console.log(item)
        <Card sx={{ Width: 1, margin:2 }}>
          <CardMedia
            component="img"
            height="140"
            image={item.picture}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.product_name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {item.points}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {item.status}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {item.deliver_time}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              #{item.order_id}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
