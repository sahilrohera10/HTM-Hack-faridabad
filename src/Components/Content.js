import React from "react";
import "./Content.css";

const data = [
  {
    text: "You can share your skills , development tools , books, podcasts, and blogs made by you",
    color: "#E73B61",
  },
  {
    text: "You can share your skills , development tools , books, podcasts, and blogs made by you",
    color: "#223BC9",
  },
  {
    text: "You can share your skills , development tools , books, podcasts, and blogs made by you",
    color: "#902624",
  },
  {
    text: "You can share your skills , development tools , books, podcasts, and blogs made by you",
    color: "#223BC9",
  },
  {
    text: "You can share your skills , development tools , books, podcasts, and blogs made by you",
    color: "#902624",
  },
  {
    text: "You can share your skills , development tools , books, podcasts, and blogs made by you",
    color: "#E73B61",
  },
];

export default function Content() {
  return (
    <div className="contentDiv">
      <div className="contentCardDiv">
        {data.map((d) => (
          <div className="card" style={{ backgroundColor: d.color }}>
            <p className="cardText">{d.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
