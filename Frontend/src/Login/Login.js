import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react'

import './Login.css';

export default function Login() {

    if (localStorage.getItem("data") === null) {
        
        return (
            <section className='form my-4 mx-5'>
                <div className="container">
                    <div className="row no-gutters">
                        <div className="image col-lg-5">
                            {/* <img src="bg.jpg" alt="Random Picture" /> */}
                        </div>
                    </div>
                    <div className="card col-lg-7 px-5 pt-5">
                        <h1 className='font-weight-bold py-3'>Logo</h1>
                        <h4>Sign in to your account</h4>
                        <form className="form">
                            <div className="form-row">
                                <div className="col-lg-7">
                                    <a href="https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=Qkpy3jC17jwlqOVBISsAub5fOEyRWr9yi48VcgeK&response_type=code&scope=profile picture&redirect_uri=http://localhost:3000/dashboard">
                                        <button type="button" className="btn1">Login with SSO</button>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
          } else {
            window.location.replace("http://localhost:3000/dashboard");
    
          }
}