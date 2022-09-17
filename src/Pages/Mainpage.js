import React from "react";
import { useState, useEffect } from "react";

import "./Mainpage.css";

// import backgroundimage from "../../assets/backgroundimage.gif";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import post from "..//assets/post.png";
// import Navbar from "../../Components/Navbar/Navbar";
import profile from "../assets/profile.jpg";
import NewNav from "../Components/NewNav";

const feeds = [
  {
    name: "The Humsafar Trust",
    text: "By creating safe, welcoming places for all, we can support LGBTQ young people in knowing they are accepted as they are.",
    img: "/broken-image.jpg",
  },
  {
    name: "The Humsafar Trust",
    text: "By creating safe, welcoming places for all, we can support LGBTQ young people in knowing they are accepted as they are.",
    img: "/broken-image.jpg",
  },
];

export default function Mainpage() {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    try {
      fetch("http://localhost:3222/getAllPosts")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFeed(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //     fetch("http://localhost:3222/getAllPosts")
  //       .then((resp) => resp.json())
  //       .then((data) => setFeed(data));
  //     console.log(resp);
  //   }, []);

  return (
    <div className="mainCSS">
      <NewNav />

      <div className="backgroundImage">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {feed &&
            feed.map((data) => (
              <div className="feeds">
                <div className="namedetails">
                  <Avatar className="avatar" />
                  <p className="name">{data.userId}</p>
                  <Button
                    variant="text"
                    style={{
                      marginLeft: "18rem",
                      marginTop: "1rem",
                    }}
                  >
                    FOLLOW +
                  </Button>
                </div>
                <div>
                  <p> {data.caption}</p>
                </div>
                <div className="posts">
                  <img
                    className="image"
                    src={`http://localhost:3222/uploads/${data.imageId}`}
                    alt=""
                  />
                </div>
              </div>
            ))}
        </div>

        {/* channels!!!!!! */}
        <div style={{ marginLeft: "8rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              position: "fixed",
            }}
          >
            <div className="channels">
              <div style={{ display: "flex" }}>
                <Avatar
                  className="profile"
                  alt=""
                  src={profile}
                  sx={{ width: 48, height: 48 }}
                />
                <h3 style={{ marginLeft: "27px", marginTop: "8px" }}>
                  RAINBOW LAKE
                </h3>
              </div>
              <p style={{ marginTop: "2px" }}>
                Everyone deserves to live a life without fear, to be able to
                express
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
