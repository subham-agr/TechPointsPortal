// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react'
import Logo from '../static/images/logo/itc.png'

import './Login.css';

export default function Login() {

    if (localStorage.getItem("data") === null) {
        
        return (
            <div className='container'>
                <div className="card">
                    <div className="row">
                        <div className="images">
                            <img src={Logo} alt="Random Picture" />
                        </div>
                    </div>
                    <div>
                        <h4>Sign in to your account</h4>
                        <form className="form">
                            <div className="form-row">
                                <div className="col-lg-7">
                                    <a href="https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=Qkpy3jC17jwlqOVBISsAub5fOEyRWr9yi48VcgeK&response_type=code&scope=profile picture ldap program&redirect_uri=http://localhost:3000/dashboard">
                                        <button type="button" className="btn1">Login with SSO</button>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
          } else {
            window.location.replace("http://localhost:3000/dashboard");
    
          }
}