import React from "react";
import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import CardContext from "../../context/cardContext.jsx";

const Navigation = () => {
  const navRef = useRef();
  const { isAuthenticated, username } = useContext(AuthContext);
  const { card } = useContext(CardContext);
  const [menuOpen, setMenuOpen] = useState(false);
  let userNavigation = (
    <>
      <li>
        <Link className="navLink" to="my-pizzas">
          My Pizzas
        </Link>
      </li>
      <li>
        <Link className="navLink" to="pizzas/create">
          Make your own pizza
        </Link>
      </li>
      <li>
        <Link className="navLink" to="my-orders">
          Orders
        </Link>
      </li>
      <li>
        <Link className="navLink" to="logout">
          Logout
        </Link>
      </li>
      <li>
        <Link className="navLink" to="card">
          <div className="shoppingCardWrapperNav">
            <MdOutlineShoppingCart className="shoppingCard" />
            <span className="cardNum">
              {Object.keys(card).length
                ? Object.values(card)
                    ?.map((x) => x?.quantity)
                    ?.reduce((acc, cur) => acc + cur)
                : 0}
            </span>
          </div>
        </Link>
      </li>
    </>
  );
  let guestNavigation = (
    <>
      <li>
        <Link className="navLink" to="login">
          Login
        </Link>
      </li>
      <li>
        <Link className="navLink" to="register">
          Register
        </Link>
      </li>
    </>
  );
  return (
    <header className="header">
      <nav className="navbar" ref={navRef}>
        <Link className="navTitle" to="/">
          Pizza Factory
        </Link>
        <div className="navMenu">
          <div className="navMenuBtn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoMdClose /> : <FaBars />}
          </div>
          <ul
            className={menuOpen ? "navMenuItems menuOpen" : "navMenuItems"}
            onClick={() => setMenuOpen(false)}
          >
            <li>
              <Link className="navLink" to="/">
                Dashboard
              </Link>
            </li>
            {isAuthenticated ? userNavigation : guestNavigation}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
