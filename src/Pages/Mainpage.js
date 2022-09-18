import React from "react";
import { useState, useEffect } from "react";

import "./Mainpage.css";

// import backgroundimage from "../../assets/backgroundimage.gif";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import post from "..//assets/post.png";
// import Navbar from "../../Components/Navbar/Navbar";
import profile from "../assets/profile.jpg";
import NewNav from "../Components/NewNav";
import CommentsModal from "../Components/CommentsModal";

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
                      marginLeft: "15rem",
                      marginTop: "1rem",
                    }}
                  >
                    FOLLOW +
                  </Button>
                </div>
                <div>
                  <p style={{ marginLeft: "20px" }}> {data.caption}</p>
                </div>
                <div className="posts">
                  <img
                    className="image"
                    src={`http://localhost:3222/uploads/${data.imageId}`}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    border: "1px solid black",
                    borderRadius: "20px",
                    width: "350px",
                    marginLeft: "130px",
                    height: "60px",
                    marginTop: "20px",
                  }}
                >
                  <input
                    style={{
                      width: "350px",
                      height: "50px",
                      // marginTop: "20px",
                      // marginLeft: "125px",
                      borderRadius: "20px",
                      border: "none",
                    }}
                    placeholder=" Your Comment...."
                    type="text"
                  />
                  <button
                    style={{
                      width: "70px",
                      height: "30px",
                      marginTop: "15px",
                      marginRight: "10px",
                    }}
                  >
                    Send
                  </button>
                </div>

                <CommentsModal comments={data.comments} />
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
