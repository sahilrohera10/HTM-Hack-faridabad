import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddPostModal from "./AddPostModal";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const isAuth = localStorage.getItem("isAuth");
  return (
    <div
      className="navMainDiv"
      style={{
        backgroundImage: "-webkit-linear-gradient(40deg,#fff 50%, #174b89 50%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <img
            style={{ width: "180px", height: "55px" }}
            src="MainLogo.jpeg"
            alt=""
          />
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <p className="navcontent">HOME</p>
          </Link>
          <Link to="feeds" style={{ textDecoration: "none", color: "black" }}>
            <p className="navcontent">FEEDS</p>
          </Link>
          <p className="navcontent">FORUM</p>
        </div>
        {isAuth ? (
          <>
            <AddPostModal />
            <div class="dropdown">
              <button class="dropbtn">
                {" "}
                <Avatar style={{ marginRight: "40px" }} />
              </button>
              <div class="dropdown-content">
                <a href="#">Profile</a>
                <p
                  style={{ marginLeft: "18px" }}
                  onClick={(e) => handleLogout(e)}
                >
                  LogOut
                </p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}{" "}
        {/* <div style={{ display: "flex" }}>
          <button className="login">LogIn</button>
          <button className="signup">Sign Up</button>
        </div> */}
      </div>
    </div>
  );
}
