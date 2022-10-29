import React, { useEffect, useState } from 'react'
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
// import Box from '@mui/material/Box';
// import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip";
import avatar from "../static/images/avatar/1.jpeg";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RedeemIcon from "@mui/icons-material/Redeem";
import HistoryIcon from "@mui/icons-material/History";
// import { useState } from "react";
// import { Routes, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Dashboard from "../Components/Dashboard/dashboard";
import Notification from "../Components/Notifications/notifications";
import Prize from "../Components/Prizes/prizes";
import Orders from "../Components/Orders/orders";
import History from "../Components/History/history";
import "./main.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Link, Routes, Outlet } from "react-router-dom";
import Login from "../Login/Login";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;
const settings = ['Logout'];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: "#021325",
    },
  },
});

export default function Main() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let query = useQuery();
  if (localStorage.getItem("code") === null) {
    localStorage.setItem("code", query.get("code"));
  }
  // console.log(data)
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState();

  if (localStorage.getItem("data") === null) {
    if (query.get("code") === null) {
      window.location.replace("http://localhost:3000");
    }
    const data = {
      code: query.get("code"),
    };

    axios.post("http://127.0.0.1:8000/userdata", data, {headers: {"Content-Type": "application/json"}})
      .then((res) => {
        localStorage.setItem("data", JSON.stringify(res));
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
        console.log(JSON.parse(localStorage.getItem("data")));
        console.log("a");
        // setPokemon(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // setLoading(false);
      })
      .finally(() => {
        console.log("hiii");
        if (localStorage.getItem("data") === null) {
          alert("LOGIN PLEASE");
          // window.location.replace('http://localhost:3000');
        }
      });
  }
  // else{
  console.log(JSON.parse(localStorage.getItem("data")).data.roll_number);
  // }
  // }, []);

  const token = JSON.parse(localStorage.getItem('data')).data.token;

  function handleclick(e) {
    if(window.confirm("Are you sure you want to Logout?")){
      localStorage.clear();
      window.location.replace("http://localhost:3000/");
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ThemeProvider 
      theme={darkTheme}
      >
        <AppBar position="fixed" open={open} sx={{background: 'linear-gradient(to left top, #03063e, #45015c)'}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex-between">
              <div className="title justify-content">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  className="mx-2 none"
                >
                  Tech Points Portal
                </Typography>
              </div>
              <div className="avatar-icon flex">
                <Typography
                  variant="h6"
                  className="mx-2 none justify-content margin1"
                >
                  {JSON.parse(localStorage.getItem("data")).data.roll_number}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Tooltip title="Logout">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        JSON.parse(localStorage.getItem("data")).data.picture
                      }
                    />
                  </IconButton>
                  </Tooltip>
                  <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleclick}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
                </Box>
              </div>
            </div>
            
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Drawer variant="permanent" open={open} sx={{background: 'linear-gradient(to left top, #03063e, #45015c)'}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{height: "100%"}}>
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
          <Link to="/dashboard" className="textnone">
            <ListItem key="1" id="1" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/dashboard/products" className="textnone">
            <ListItem key="3" id="3" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <RedeemIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Products"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          {/* <Link to="/dashboard/orders" className="textnone">
            <ListItem key="4" id="4" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link> */}
          <Link to="/dashboard/history" className="textnone">
            <ListItem key="5" id="5" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="History"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/dashboard/notification" className="textnone">
            <ListItem key="2" id="2" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Notification"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          {/* <a onClick={(e) => handleclick(e)}>
          <ListItem
            key="6"
            id="6"
            disablePadding
            sx={{ display: "block",postion: "fixed",bottom: 0 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                // alignItems: "end",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          </a> */}
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
      <Box className="main" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        <div className='topmargin'></div>
      </Box>
      <div className='footer'>
        <h4 className='footer-heading'>Developed by Web Team with ❤️ | Institute Technical Council 2022</h4>
      </div>
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
