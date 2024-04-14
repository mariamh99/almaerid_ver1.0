import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text" style={{fontFamily:"Josefin Sans"}}>Al Maerid</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img ?`${import.meta.env.VITE_BACKEND}/${currentUser.img}`: "../img/noavatar.png"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mylistings">
                        Listings
                      </Link>
                      <Link className="link" to="/add">
                        Add New Listing
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/myprofile">
                    My profile
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/listings?cat=Graphics Design" >
              Graphics Design
            </Link>
            <Link className="link menuLink" to="/listings?cat=Video and Animation">
            Video & Animation
            </Link>
            <Link className="link menuLink" to="/listings?cat=Drawing and Illustration">
            Drawing & Illustration

            </Link>
            <Link className="link menuLink" to="/listings?cat=Digital Painting">
            Digital Painting
            </Link>
            <Link className="link menuLink" to="/listings?cat=Photography">
            Photography
            </Link>
            <Link className="link menuLink" to="/listings?cat=Print Design">
            Print Design
            </Link>
            <Link className="link menuLink" to="/listings?cat=Typography Design">
            Typography Design

            </Link>
            <Link className="link menuLink" to="/listings?cat=Motion Graphics">
            Motion Graphics
            </Link>
            <Link className="link menuLink" to="/listings?cat=3D Modeling and Rendering">
            3D Modeling & Rendering
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;