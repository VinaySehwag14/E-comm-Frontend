import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./cartHelper";
import Image from "./Image";
import "./Card.css";

const Card = ({
  product,
  addCartBt = true,
  removeCartBt = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "Its secret, explore yourself";
  const cardDescription = product
    ? product.description
    : "Its secret, explore yourself";
  const cardPrice = product ? product.price : "Its secret, explore yourself";

  const addToCart = () => {
    //!set redirect true for redirecting after adding to cart
    addItemToCart(product, () => setRedirect(false));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addCartBt) => {
    return (
      addCartBt && (
        <div className="col-12">
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-warning mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const showRemoveCart = (removeCartBt) => {
    return (
      removeCartBt && (
        <div className="col-12">
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };
  return (
    <div className="card border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      {getRedirect(redirect)}
      <div className="card-body">
        <Image product={product} />
        <p className="lead font-weight-normal text-wrap">{cardDescription}</p>
        <p className="btn btn-block btn-muted rounded  mt-2 mb-2">
          ₹ {cardPrice}
        </p>
        <div className="row">
          {showAddToCart(addCartBt)}
          {showRemoveCart(removeCartBt)}
        </div>
      </div>
    </div>
  );
};

export default Card;
