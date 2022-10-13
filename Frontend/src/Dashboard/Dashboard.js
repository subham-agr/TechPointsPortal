import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import avatar from '../static/images/avatar/1.jpeg'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';  
import axios from "axios";
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Dashboard() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let query = useQuery();
  if(localStorage.getItem('code')===null){
    localStorage.setItem('code',query.get('code'))
  }
  // console.log(data)
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState();
    if(localStorage.getItem('data')===null){
      if(query.get('code')===null){
        window.location.replace('http://localhost:3000');
      }
      const data = {
        code:query.get('code'),
      };
    axios
    .post('http://127.0.0.1:8000/userdata', data, {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      localStorage.setItem('data',JSON.stringify(res))
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
      console.log(JSON.parse(localStorage.getItem('data')).data.name);
      console.log('a')
      // setPokemon(res.data);
      // setLoading(false);
    }
  
    )
    .catch(err => {
      console.error(err);
      // setLoading(false);
  
    }).finally( ()=>{
      console.log("hiii");
      if(localStorage.getItem('data')===null){
        alert("LOGIN PLEASE")
        // window.location.replace('http://localhost:3000');
      }
    });
  }
  // else{
    console.log(JSON.parse(localStorage.getItem('data')).data.name);
    // }
  // }, []);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Tech Points Portal
          </Typography>
          {/* <Tooltip title="Open settings"> */}
          <Box sx = {{ flexGrow: 1}}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={JSON.parse(localStorage.getItem('data')).data.picture} />
              </IconButton>
          </Box>
            {/* </Tooltip> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {['Dashboard', 'Notification', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))} */}
          <ListItem key="1" disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
              <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
          <ListItem key="2" disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
              <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
              >
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notification" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
          <ListItem key="5" disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
              <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
              >
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText primary="Prizes" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
          <ListItem key="4" disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
              <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
              >
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
          <ListItem key="3" disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
              <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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
      </Box>
    </Box>
  );
}


// export default async function Dashboard() {
//   let query = useQuery();
//   if(localStorage.getItem('code')===null){
//     localStorage.setItem('code',query.get('code'))
//   }
//   // console.log(data)
//   const [isLoading, setLoading] = useState(true);
//   const [pokemon, setPokemon] = useState();
//     if(localStorage.getItem('data')===null){
//       if(query.get('code')===null){
//         window.location.replace('http://localhost:3000');
//       }
//       const data = {
//         code:query.get('code'),
//       };
//     axios
//     .post('http://127.0.0.1:8000/userdata', data, {headers: {"Content-Type": "application/json"}})
//     .then((res) => {
//       localStorage.setItem('data',JSON.stringify(res))
//       // setTimeout(() => {
//       //   window.location.reload();
//       // }, 500);
//       console.log(JSON.parse(localStorage.getItem('data')).data.name);
//       console.log('a')
//       // setPokemon(res.data);
//       // setLoading(false);
//     }
  
//     )
//     .catch(err => {
//       console.error(err);
//       // setLoading(false);
  
//     }).finally( ()=>{
//       console.log("hiii");
//       if(localStorage.getItem('data')===null){
//         // alert("LOGIN PLEASE")
//         // window.location.replace('http://localhost:3000');
//       }
//     });
//   }
//   // else{
//   //   console.log('b')
//   // }
//   // }, []);


// // if (isLoading) {
// //   return <div className="App">Loading...</div>;
// // }

//   // if(localStorage.getItem('data')===null && codeid===null){
//   //   // alert("LOGIN PLEASE")
//   //   window.location.replace('http://localhost:3000');
//   // }
// //   useEffect(() => {
// //     console.log('l')
// //   });
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   searchParams.get('code');
// //   const navigate = useNavigate();
// //   if(searchParams.get('code')!==undefined){
// //     localStorage.setItem('code',searchParams.get('code'));
// //   }
// //   if (localStorage.getItem('data')===null){
// //     if(searchParams.get('code')===undefined){
// //       navigate("/preferences");
// // } 
// //   const data = {
// //     code: searchParams.get('code')
// //   };
// //   await userData(data);
// //   }
// //   console.log(localStorage.getItem('data'));
// //   console.log(localStorage.getItem('name'));
// //   console.log(localStorage.getItem('picture'));
// //   console.log(searchParams.get('code'));
// //     searchParams.delete('code');  
// //     console.log(searchParams.get('code'))
//   return <DashboardContent/>;
// }