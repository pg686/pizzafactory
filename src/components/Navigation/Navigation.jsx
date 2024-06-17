import React from 'react';
import {useRef, useState } from 'react';
import './Navigation.modules.css';
import { motion } from "framer-motion";
import {FaBars, FaTimes } from 'react-icons/fa';
import  {Link} from "react-router-dom";
const Navigation = () => {
    const navRef = useRef();
    const headerRef = useRef();
    const [click, setClick] = useState(false);

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");

        headerRef.current.classList.toggle("responsive-style");
    }
    let userNavigation = ( <>
        <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" to="my-pizzas">My Pizzas</Link></li>
        <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" to="/create">Make your own pizza</Link></li>
        <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" to="orders">Orders</Link></li>
        <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" to="profile">Profile</Link></li>
        <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" to="logout">Logout</Link></li>
        </>
    );
    let guestNavigation = ( <>
        <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" to="login">Login</Link></li>
        <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" to="register">Register</Link></li>
        </>
    );
  return (

    <div className="container">
   <header className="header" ref={headerRef}>
   <Link className="logoWrapper"to="apufrens"> <img src="/images/logo.png" className="logo"  /> <span className="dashboard">Pizza Factory</span></Link>

   <nav className='navbar' ref={navRef}>
   <motion.ul
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness:200, duration: 0.5 }} >
    <li className="strong-hover-shake"><Link activeClass="active" className="page-scroll navLinks" offset={0} spy={true} smooth={true}  duration={500} to="dashboard">Dashboard</Link></li>
    {    true ? userNavigation : guestNavigation   }   
   </motion.ul>
   </nav>
   <button className='nav-btn' onClick={showNavbar}>
   <FaBars />
   </button>
   </header>
   </div> 
  )
}

export default Navigation