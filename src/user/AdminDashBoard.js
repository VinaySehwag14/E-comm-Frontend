import React from "react";
import Base from "../components/base";
import Footer from "../components/Footer";
import adminLeftSide from "./adminLeftSide";
import adminRightSide from "./adminRightSide";

const AdminDashBoard = () => {
  return (
    <>
      <Base
        title="Admin DashBoard "
        description=" "
        className="container bg-warning p-4"
      >
        <div className="row">
          <div className="col-sm-3">{adminLeftSide()}</div>
          <div className="col-9">{adminRightSide()}</div>
        </div>
      </Base>
      <Footer />
    </>
  );
};

export default AdminDashBoard;
