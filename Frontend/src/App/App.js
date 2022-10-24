import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Login from '../Login/Login';
import Main from '../Main/main';
import Status from '../Components/Status/status';
import Notification from '../Components/Notifications/notifications';
import Dashboard from '../Components/Dashboard/dashboard';
import Prize from '../Components/Prizes/prizes';
import History from '../Components/History/history';
import Orders from '../Components/Orders/orders';

function App() {
  return (
    <div className="wrapper">
      {/* <Header title='To-DoList'/> */}
      {/* <h2>Application</h2> */}
      <BrowserRouter>
        <div className="links">
          {/* <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/preferences">Preferences</Link>
            </li>
          </ul> */}
          {/* <Dashboard/> */}
        </div>
        <Routes>
          {/* <Route path="/notif" element={<Notification />}></Route> */}
          {/* <Route path="/dashboard" element={<Main />}></Route> */}
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Main />}>
            <Route path="" element={<Dashboard />}/>
            <Route path="products" element={<Prize />}/>
            <Route path="history" element={<History />}/>
            <Route path="orders" element={<Orders />}/>
            <Route path="notification" element={<Notification />}/>
          </Route>
          {/* <Route path="/status" element={<Status />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;