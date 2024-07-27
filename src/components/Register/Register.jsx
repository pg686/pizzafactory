import React from 'react'
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
const Register = () => {
  return (
    
    <div className='authWrapper'>
        <div className="login">
   <form action=''>
    <h1>Register</h1>
    <div className='input-box'>
        <input type='text' placeholder='Email' required/>
        <FaUser className='authIcons'/>
    </div>
    <div className='input-box'>
        <input type='password' placeholder='Password' required/>
        <FaLock  className='authIcons'/>
    </div>
    <div className='input-box'>
        <input type='password' placeholder='Confirm Password' required/>
        <FaLock  className='authIcons'/>
    </div>
    <div className='remeber-forget'>
        <label>
            <input type='checkbox' />
            Remember me
        </label>
    </div>
    <button type='submit' className='authBtn'>Register</button>
    <div className='register-link'>
        <p>Already have an account?</p>
        <Link to={`/login`} >
            Login
          </Link>
    </div>
   </form>
  </div>
  </div>
  )
}

export default Register