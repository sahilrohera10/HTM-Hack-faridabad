import React from "react";
import { Button } from "@mui/material";
import NavBar from "../Components/NewNav";
const Ngo = [
  {
    name: "Nazaria",
    description:
      "Founded in 2014, Nazaria is a queer feminist support group, which works for lesbian bisexual women and trans people who are assigned female at birth.",
    image: "NgoLogo.jpeg",
  },
  {
    name: "The Bi-Collective",
    description:
      "They are a community collective working for bisexual, bi+, bi-curious and pansexual people in and around Delhi.",
    image: "NgoLogo.jpeg",
  },
];

export default function NGOsPage() {
  const cId = "djshgfvjh";

  const initiatePayment = async (amt) => {
    let amount = amt;
    let oid = Math.floor(Math.random() * Date.now());
    const data = { amount, orderId: oid, cId };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      "http://localhost:3222/initiatePayment",
      requestOptions
    );
    response = await response.json();
    console.log("response ==> ", response);
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: response.txnToken,
        tokenType: "TXN_TOKEN",
        amount: amount,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <>
      <NavBar />
      <div>
        <div
          style={{
            width: "760px",
            height: "310px",
            paddingLeft: "10px",
            paddingTop: "10px",
            borderWidth: "2px",
            marginLeft: "240px",
            marginTop: "120px",
            //   border:"solid red"
          }}
        >
          <img
            src="Banner.jpeg"
            alt=""
            style={{
              height: "300px",
              width: "750px",
              border: "4px solid black",
              borderRadius: "5px",
            }}
          />
        </div>
        <div>
          <p
            style={{
              fontWeight: "bolder",
              fontSize: "40px",
              paddingLeft: "80px",
            }}
          >
            NGO's
          </p>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {Ngo.map((data) => (
              <div
                style={{
                  backgroundColor: "#e6e6e6",
                  boxShadow: "0 3px 7px 0px #cccccc",
                  borderRadius: "30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "350px",
                    justifyContent: "space-evenly",
                    height: "200px",
                    marginLeft: "40px",
                  }}
                >
                  <div>
                    <img
                      src={data.image}
                      alt=""
                      style={{
                        height: "40px",
                        width: "40px",
                        paddingTop: "18px",
                        borderRadius: "30px",
                        paddingLeft: "5px",
                      }}
                    />
                  </div>
                  <div>
                    <h2 style={{ paddingLeft: "20px" }}>{data.name}</h2>
                    <p style={{ paddingLeft: "20px" }}>{data.description}</p>
                  </div>
                </div>

                <Button
                  variant="text"
                  style={{
                    width: "30px",
                    marginLeft: "60px",
                    marginBottom: "10px",
                  }}
                  onClick={() => initiatePayment(1000)}
                >
                  Donate
                </Button>
                <Button
                  variant="text"
                  style={{
                    width: "100px",
                    marginLeft: "95px",
                    marginBottom: "10px",
                  }}
                >
                  Volunteer
                </Button>
              </div>
            ))}
          </div>
          <br></br>
        </div>
      </div>
    </>
  );
}
