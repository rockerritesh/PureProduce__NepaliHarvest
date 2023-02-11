import React, { useState } from "react";
import "../Style/style.css";
import Logo from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [isNavListVisible, setIsNavListVisible] = useState(false);

  const toggleNavList = () => {
    setIsNavListVisible(!isNavListVisible);
  };
  const handleClick=()=>{
    navigate("/")
  }
  return (
    <>
      <nav className="navbar">
        <div className="row container d-flex">
          <div className="logo">
            <center>
              <img onClick={handleClick}
                src={Logo}
                style={{ height: "40px", width: "40px", cursor:"pointer" }}
                alt=""
              />
            </center>{" "}
            <center>
              <b>Nepali</b>&nbsp;Harvest
            </center>
          </div>

          <div className={`nav-list d-flex ${isNavListVisible ? "show" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/">About Us</Link>
            <Link to="/becomeafarmer">Become a farmer</Link>
            <div className="close" onClick={toggleNavList}>
              <i className="bx bx-x"></i>
            </div>
          </div>

          <div className="icons d-flex">
            <div className="icon user-icon d-flex">
              <Link to="/login">
                <i className="bx bx-user"></i>
              </Link>
            </div>
            <div className="icon d-flex">
              <i className="bx bx-bell"></i>
              <span></span>
            </div>
          </div>

          <div className="hamburger" onClick={toggleNavList}>
            <i className="bx bx-menu-alt-right"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
