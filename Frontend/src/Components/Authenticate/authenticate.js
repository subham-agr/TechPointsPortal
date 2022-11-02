import React from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BrowserRouter, Route, Link, Routes, Outlet } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Authenticate() {

    let query = useQuery();

    if (localStorage.getItem("data") === null) {
    
        if (query.get("code") === null) {
          window.location.replace("http://localhost:3000");
        }
        const data = {
          code: query.get("code"),
        };
        console.log("mmmmmm")
    
        axios.post("http://127.0.0.1:8000/userdata", data, {headers: {"Content-Type": "application/json"}}).then((res) => {
            localStorage.setItem("data", JSON.stringify(res));
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
            console.log(JSON.parse(localStorage.getItem("data")));
            console.log("a");
            // setPokemon(res.data);
            // setLoading(false);
          }).catch((err) => {
            console.error(err);
            // setLoading(false);
          })
          .finally(() => {           
            // window.location.replace("http://localhost:3000/dashboard")
          });
      }
      else
      {
        window.location.replace("http://localhost:3000/dashboard")
      }


  return (
    <div>
      <h1>Wait</h1>
    </div>
  )
}