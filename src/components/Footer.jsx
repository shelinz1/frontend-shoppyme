import React from "react";

const Footer = () => {
  return (
    <>
      {" "}
      <div className="footer">
        <div>
          <p style={{ fontSize: "2rem", color: "gray" }}>
            <i className="fas fa-mobile"></i>
          </p>
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>Call us 24x7</p>
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
            {" "}
            +2349035436804
          </p>
        </div>

        <div>
          {" "}
          <p style={{ fontSize: "2rem", color: "gray" }}>
            <i className="fas fa-location"></i>
          </p>
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>Headquaters</p>
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
            Akure,Ondo state Nigeria
          </p>
        </div>

        <div>
          {" "}
          <p style={{ fontSize: "2rem", color: "gray" }}>
            <i className="fas fa-fax"></i>
          </p>
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>Fax</p>
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
            {" "}
            +2349035436804
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
