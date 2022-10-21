import React from 'react'
import Typography from '@mui/material/Typography';
import './dashboard.css'
import Grid from '@mui/material/Grid';

export default function Dashboard() {
  return (
    <div className='content'>
      <div className="points">
        <Grid container className='flex-between'>
          <Grid item xs={4} className="center-align left">
          <h1 className='size'>Current Points</h1>
          <h3 className='size'>Points</h3>
          </Grid>
          <Grid item xs={4} className="center-align">
          <h1 className='size'>Total Earned</h1>
          <h3 className='size'>Points</h3>
          </Grid>
          <Grid item xs={4} className="center-align right">
          <h1 className='size'>Total Reedemed</h1>
          <h3 className='size'>Points</h3>
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
