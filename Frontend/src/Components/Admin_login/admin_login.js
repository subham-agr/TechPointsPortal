import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import './admin_login.css'
import axios from "axios";
import { Link } from 'react-router-dom';

const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
    },
    // '& input:invalid + fieldset': {
    //     borderColor: "#1976d280",
    //     borderWidth: 2,
    // },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
    },
});

export default function Adminlogin() {


    // function handleChange(event) {
    //     console.log(event)
    // }

    const token = JSON.parse(localStorage.getItem('data')).data.token;

    function handlelogin() {
        var userid = document.getElementById('user-id').value;
        var pass = document.getElementById('password').value;
        const login_data = {
            username: userid,
            password: pass
        };

        axios
      .post("http://localhost:8000/token", login_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // setorder_admin(res.data)
        console.log(res);
        if(res.data.success){
            localStorage.setItem("techpointsadmin_token", res.data.token);
            window.location.replace("http://localhost:3000/order_admin");
        }
        else if(res.data.success==false){
            alert("Invalid credentials!")
        }
      });

        // console.log(login_data);
    }

    return (
        <div className="flexbox">
            <Card sx={{ maxWidth: 345 }} className="shadow">
                {/* <CardMedia
                    component="img"
                    height="140"
                    image="/logo/Coinwhite.png"
                    alt="green iguana"
                /> */}
                <CardContent className='cardbg'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                        className='text-align'
                    >
                        <h1>Admin Login</h1>
                        <ValidationTextField
                            label="User ID"
                            required
                            variant="outlined"
                            // defaultValue="Success"
                            id="user-id"
                            // onChange={handleChange}
                        />
                        <ValidationTextField
                            label="Password"
                            required
                            type="password"
                            variant="outlined"
                            // defaultValue="Success"
                            id="password"
                            // onChange={handleChange}
                        />
                    </Box>
                </CardContent>
                <CardActions className='justify-content cardbg'>
                    {/* <Link to="/order_admin" className="decoration"> */}
                      <Button variant="outlined" onClick={handlelogin}>Login</Button>
                    {/* </Link> */}
                    {/* <Button size="small">Learn More</Button> */}
                </CardActions>
            </Card>
        </div>
    );
}
