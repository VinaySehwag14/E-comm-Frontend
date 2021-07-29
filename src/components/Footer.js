import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer fixed-bottom bg-dark mt-auto ">
        <div
          className="container-fluid bg-information
       text-center text-white py-3"
        >
          <h4>Copyright &copy; 2021 All Rights Reserved by Vinay Sehwag</h4>
          {/* <button className="btn btn-warning btn-lg">Contact Us</button> */}
        </div>
        {/* <div className="container">
        <span className="text-muted">
          This is where you will get healthy and chemical free food
        </span>
      </div> */}
      </footer>
    </div>
  );
};

export default Footer;
