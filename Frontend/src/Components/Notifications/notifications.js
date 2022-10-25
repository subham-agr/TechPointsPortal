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
  const [notif, setnotif] = useState(true);
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

  if(notificationlist==[]){
    setnotif(false);
    console.log(notif)
  }
  
  console.log(notif)

  function handleClear() {
    console.log(data)
    axios.delete('http://localhost:8000/notifs', data)
    .then((res) => {
      console.log(res)
    });
    // window.location.reload(true);
  }

  function handleclose(event) {
    const data1 = {
      order_id: JSON.parse(event.target.id)
    };
    axios.put("http://localhost:8000/notifs", data1, {headers: { "Content-Type" : "application/json" }})
    .then((res) => {
      console.log(res)
    });
    window.location.reload(true);
  }

  // console.log(notificationlist[0])

  return (
    <div>
      <div className='justify-content'>
        <h1>Notifications</h1>
      </div>
      {notif? (
        <div className='auto'>
          <Button onClick={handleClear}>Clear All</Button>
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
              <Button id={item.order_id} onClick={handleclose}>Close</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      ):(
        <div className='justify-content'>
          <h1>No Notification to Show</h1>
        </div>
      )}
    </div>
  );
}
