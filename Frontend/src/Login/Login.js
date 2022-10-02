import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }
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
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-row">
                                <div className="col-lg-7">
                                    <input type="email" placeholder="Email-Address" className="form-control my-3 p-4" onChange={e => setUserName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-7">
                                    <input type="password" placeholder="*****" className="form-control my-3 p-4" onChange={e => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-7">
                                    <button type="button" className="btn1" onClick={handleSubmit}>Login</button>
                                </div>
                            </div>
                            <div className="form-row orheading">
                                <h3>Or</h3>
                            </div>
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

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }