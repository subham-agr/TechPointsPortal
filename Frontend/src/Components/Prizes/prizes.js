import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '../../static/images/avatar/1.jpeg';
import product_card from './productdata'
import Grid from '@mui/material/Grid';
// import Grid from '@mui/material/Unstable_Grid2';

export default function Prize() {

  const products = product_card.map((item) =>
  <Grid item xl={2} lg={3} xs={12} sm={6} md={4}>
  <Card sx={{ maxWidth: 345 }} key={item.id}>
  <CardMedia
    component="img"
    height="140"
    image={item.img}
    alt="Product1"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      {item.name}
    </Typography>
    <Typography gutterBottom variant="body2" color="text.secondary">
      {item.desc}
    </Typography>
    <Typography variant="h5" component="h2">
      {item.points}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Reedem Now</Button>
    <Button size="small">Add to Cart</Button>
  </CardActions>
  </Card>
  </Grid>
  );

  return (
    <div className="products">
      <Grid container spacing={2}>
          {products}
      </Grid>
    </div>
  );
}
