import React from "react";
import { API } from "../backend";
const Image = ({ product }) => {
  const imageurl = product
    ? `${API}/product/image/${product._id}`
    : `https://images.pexels.com/photos/7955141/pexels-photo-7955141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="image"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default Image;
