import * as React from 'react';
import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import { useNavigate } from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';  
import axios from "axios";
import { useLocation } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

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
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List> */}
          <List>
            Orders,Charts
          </List>
        </Drawer>
        {/* <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              Chart
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              Recent Deposits
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              Recent Orders
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box> */}
      </Box>
    </ThemeProvider>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default async function Dashboard() {
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
        // alert("LOGIN PLEASE")
        // window.location.replace('http://localhost:3000');
      }
    });
  }
  // else{
  //   console.log('b')
  // }
  // }, []);


// if (isLoading) {
//   return <div className="App">Loading...</div>;
// }

  // if(localStorage.getItem('data')===null && codeid===null){
  //   // alert("LOGIN PLEASE")
  //   window.location.replace('http://localhost:3000');
  // }
//   useEffect(() => {
//     console.log('l')
//   });
//   const [searchParams, setSearchParams] = useSearchParams();
//   searchParams.get('code');
//   const navigate = useNavigate();
//   if(searchParams.get('code')!==undefined){
//     localStorage.setItem('code',searchParams.get('code'));
//   }
//   if (localStorage.getItem('data')===null){
//     if(searchParams.get('code')===undefined){
//       navigate("/preferences");
// } 
//   const data = {
//     code: searchParams.get('code')
//   };
//   await userData(data);
//   }
//   console.log(localStorage.getItem('data'));
//   console.log(localStorage.getItem('name'));
//   console.log(localStorage.getItem('picture'));
//   console.log(searchParams.get('code'));
//     searchParams.delete('code');  
//     console.log(searchParams.get('code'))
  return <DashboardContent />;
}