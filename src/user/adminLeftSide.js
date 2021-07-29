import React from "react";
import { Link } from "react-router-dom";

const adminLeftSide = () => {
  return (
    <div className="card">
      <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/admin/create/category" className="nav-link text-warning">
            Create Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/categories" className="nav-link text-warning">
            Manage Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/create/product" className="nav-link text-warning">
            Create Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/products" className="nav-link text-warning">
            Manage Product
          </Link>
        </li>
        {/* //*work on this when you make it official */}
        {/* <li className="list-group-item">
          <Link to="/admin/orders" className="nav-link text-warning">
            Manage Order
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default adminLeftSide;
