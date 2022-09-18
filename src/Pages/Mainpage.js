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
import CreateChannelModal from "../Components/CreateChannelModal";

const color = [
  "hwb(314deg 5% 57% / 21%)",
  "rgb(246 27 27 / 21%);",
  "#F3ABAA",
  "#CBE7DF",
];

export default function Mainpage() {
  const [feed, setFeed] = useState(null);

  const channels = [
    {
      name: "RAINBOW LAKE",
      text: " Everyone deserves to live a life without fear, to be able to express",
    },
    {
      name: "RAINBOW LAKE",
      text: " Everyone deserves to live a life without fear, to be able to express",
    },
  ];

  const suggest = [
    {
      name: "RAINBOW LAKE",
      text: " Everyone deserves to live a life without fear, to be able to express",
    },
  ];

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
        <div
          style={{
            position: "fixed",
            top: "90%",
            width: "150px",
            height: "100px",
          }}
        >
          <CreateChannelModal />
          {/* <button
            style={{
              border: "none",
              background: "#174B89",
              padding: "10px",
              color: "white",
              borderRadius: "20px",
              marginLeft: "15px",
              cursor: "pointer",
            }}
          >
            Create Channel <span style={{ fontSize: "20px" }}>+</span>
          </button> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "50px",
          }}
        >
          {feed &&
            feed.map((data, index) => (
              <>
                <div
                  className="feeds"
                  style={{ backgroundColor: color[index] }}
                >
                  <div className="posts">
                    <img
                      className="image"
                      src={`http://localhost:3222/uploads/${data.imageId}`}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                      width: "300px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <Avatar
                        className="profile"
                        alt=""
                        src={profile}
                        sx={{ width: 30, height: 30, marginTop: "28px" }}
                      />

                      <p
                        style={{
                          fontSize: "25px",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        {data.userName}
                      </p>
                    </div>

                    <p>{data.caption}</p>

                    <div
                      style={{
                        display: "flex",
                        border: "1px solid black",
                        borderRadius: "20px",
                        width: "300px",
                        height: "40px",
                        marginTop: "80px",
                        background: "white",
                      }}
                    >
                      <input
                        className="comments"
                        placeholder=" Your Comment...."
                        type="text"
                      />
                      <button
                        style={{
                          width: "70px",
                          height: "30px",
                          marginTop: "5px",
                          marginRight: "10px",
                          borderRadius: "20px",
                          border: "none",
                        }}
                      >
                        Post
                      </button>
                    </div>
                    <CommentsModal comments={data.comments} />
                  </div>
                </div>
              </>
            ))}
        </div>

        {/* channels!!!!!! */}
        <div style={{ marginLeft: "5rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              position: "fixed",
            }}
          >
            <p>JOINED CHANNELS : </p>
            {channels.map((d) => (
              <div className="channels">
                <div style={{ display: "flex" }}>
                  <Avatar
                    className="profile"
                    alt=""
                    src={profile}
                    sx={{ width: 48, height: 48 }}
                  />
                  <h3 style={{ marginLeft: "27px", marginTop: "8px" }}>
                    {d.name}
                  </h3>
                </div>
                <p style={{ marginTop: "2px" }}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "350px",
            position: "fixed",
            marginLeft: "1020px",
          }}
        >
          <p>SUGGESTIONS TO JOIN :</p>
          {suggest.map((d) => (
            <div className="channels">
              <div style={{ display: "flex" }}>
                <Avatar
                  className="profile"
                  alt=""
                  src={profile}
                  sx={{ width: 48, height: 48 }}
                />
                <h3 style={{ marginLeft: "27px", marginTop: "8px" }}>
                  {d.name}
                </h3>
              </div>
              <p style={{ marginTop: "2px" }}>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
