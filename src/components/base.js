import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "./base.css";

const Base = ({
  title = "My Tittle",
  description = "My description",
  className = "bg-white text-dark p-4",
  children,
}) => (
  <div>
    <Navbar />
    <div className="jumbotron container-fluid">
      <div className="jumbotron text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Base;
