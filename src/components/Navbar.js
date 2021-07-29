import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const activeNav = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ffc107" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Navbar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={activeNav(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={activeNav(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            style={activeNav(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )} */}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            style={activeNav(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              style={activeNav(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>

          <li className="nav-item">
            <Link
              style={activeNav(history, "/signin")}
              className="nav-link text-info"
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </>
      )}
      {isAuthenticated() && (
        <li className="nav-items">
          <span
            className="nav-link text-danger"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Navbar);
