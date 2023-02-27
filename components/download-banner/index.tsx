import React from "react";
import Link from "next/link";

const Download = () => {
  return (
    <section className="download">
      <div className="download-container">
        <div className="download-content">
          <h1
            className="slogan-text"
            style={{ color: "white", fontWeight: "bold", fontSize: "35px" }}
          >
            WANT TO KNOW <a style={{color: 'limegreen'}}>REAL</a> OR <a style={{color: 'red'}}>REPLICA</a>?
          </h1>
          <h1
            className="slogan-text"
            style={{ color: "white", fontWeight: "bold", fontSize: "25px" }}
          >
            Download <a style={{ color: "orange" }}>SoleAuthenticity</a> now
          </h1>
          <h1
            className="slogan-text"
            style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
          >
            for <a style={{ color: "orange" }}>AUTHENTICATION</a>
          </h1>
        </div>
        <div className="download-img">
          <Link href="#">
            <img
              className="applogo"
              src="/images/logos/appstore.gif"
              alt="AppStore"
            />
          </Link>
          <Link href="#">
            <img
              className="applogo"
              src="/images/logos/googleplay.gif"
              alt="GooglePLay"
            />
          </Link>
        </div>
        <div className="logo-left">
          <img
            style={{
              width: "150px",
              marginRight: "1000px",
              marginTop: "-180px"
            }}
            src="/images/logos/phone.gif"
            alt="authen"
          />
        </div>
        <div className="logo-right">
          <img
            className="authen"
            style={{
              width: "150px",
              marginLeft: '900px',
              marginTop: "-270px"
            }}
            src="/images/logos/applogo.png"
            alt="authen"
          />
        </div>
      </div>
    </section>
  );
};

export default Download;
