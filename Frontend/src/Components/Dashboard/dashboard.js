import React from 'react'
import Typography from '@mui/material/Typography';
import './dashboard.css'

export default function Dashboard() {
  return (
    <div className='content'>
      <div className="points">
        <h4 className='flex-between'>Current Points <span>Points</span></h4>
        <h4 className='flex-between'>Total Earned <span>Points</span></h4>
        <h4 className='flex-between'>Total Reedemed <span>Points</span></h4>
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
