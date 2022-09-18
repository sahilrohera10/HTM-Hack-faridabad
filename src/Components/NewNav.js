import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div
      className="navMainDiv"
      style={{
        backgroundImage: "-webkit-linear-gradient(40deg,#fff 50%, #174b89 50%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <p className="HeadingName">HELLO</p>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <p className="navcontent">HOME</p>
          </Link>
          <Link to="feeds">
            <p className="navcontent">FEEDS</p>
          </Link>
          <p className="navcontent">FORUM</p>
        </div>
        <div style={{ display: "flex" }}>
          <button className="login">LogIn</button>
          <button className="signup">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
