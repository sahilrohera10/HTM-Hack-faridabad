import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    localStorage.setItem("role", "user");
    localStorage.setItem("userId", "63269ab2bc63272d355b44dc");
    localStorage.setItem("userName", "Sahil");
    localStorage.setItem("isAuth", true);

    navigate("/feeds");
  };

  const isAuth = localStorage.getItem("isAuth");

  return (
    <div className="navMainDiv">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <img
            style={{ width: "180px", height: "55px" }}
            src="MainLogo.jpeg"
            alt=""
          />
          {isAuth ? (
            <>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <p className="navcontent">HOME</p>
              </Link>
              <Link
                to="feeds"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="navcontent">FEEDS</p>
              </Link>
              <p className="navcontent">FORUM</p>
              <Link
                to="ngo"
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                <p className="navcontent">NGO's</p>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        {!isAuth ? (
          <div style={{ display: "flex" }}>
            <button className="signup" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </div>
        ) : (
          <Avatar style={{ marginRight: "20px" }} />
        )}
      </div>
    </div>
  );
}
