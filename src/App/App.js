import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Login from '../Login/Login';
// import Header from '../Components/Header'
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken'

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

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
          <Dashboard/>
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/preferences" element={<Preferences />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;