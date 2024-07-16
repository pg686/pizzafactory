import React from 'react';
import {useRef, useState } from 'react';
import {FaBars, FaTimes } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import  {Link} from "react-router-dom";
const Navigation = () => {
    const navRef = useRef();
    const headerRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");

        headerRef.current.classList.toggle("responsive-style");
    }
    let userNavigation = ( <>
        <li><Link className='navLink' to="my-pizzas">My Pizzas</Link></li>
        <li><Link className='navLink' to="pizzas/create">Make your own pizza</Link></li>
        <li><Link className='navLink' to="orders">Orders</Link></li>
        <li><Link className='navLink' to="profile">Profile</Link></li>
        <li><Link className='navLink' to="logout">Logout</Link></li>
        </>
    );
    let guestNavigation = ( <>
        <li><Link className='navLink' to="login">Login</Link></li>
        <li><Link className='navLink' to="register">Register</Link></li>
        </>
    );
  return (

    <header className='header'>
   <nav className='navbar' ref={navRef}>
   <Link className="navTitle" to="apufrens"> <img src="/images/logo.png" className="logo"  />Pizza Factory</Link>
<div className="navMenu">
<div className='navMenuBtn' onClick={() => setMenuOpen(!menuOpen)}>
  { menuOpen ?  <IoMdClose /> : <FaBars />}
    
    </div>
  <ul className={ menuOpen ? 'navMenuItems menuOpen' : 'navMenuItems' }
  onClick={()=> setMenuOpen(false)}>
  <li><Link className='navLink' to="dashboard">Dashboard</Link></li>
    {    true ? userNavigation : guestNavigation   }   
   </ul>

</div>

   </nav>
   </header>

  )
}

export default Navigation