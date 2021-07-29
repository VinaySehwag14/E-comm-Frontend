import React from "react";
import { isAuthenticated } from "../auth";

const adminRightSide = () => {
  const {
    user: { email, role },
  } = isAuthenticated();

  return (
    <div className="card mb-4">
      <h4 className="card-header">Admin info</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-pill bg-warning mr-2">Email:</span>
          {email}
        </li>
        <li className="list-group-item">
          <span>Roll:</span>
          {role && (
            <span className="badge badge-pill bg-warning mr-2">Admin</span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default adminRightSide;
