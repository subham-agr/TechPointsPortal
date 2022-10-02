import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className='container'>
      <form>
          <label>Ldap</label>
          <input type="text"/><br />
          <label>Password</label>
          <input type="password" />
          <br />
          <button type='submit'>Login</button>
      </form>
    </div>
  )
}
