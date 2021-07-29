import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createOrder } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth";
import { getToken, processPayment } from "../payment/paymentHelper";
import { cartEmpty, loadCart } from "./cartHelper";

const BraintreePayment = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getMeToken = (userId, token) => {
    getToken(userId, token).then((info) => {
      console.log("INFO", info);
      if (info && info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block text-white btn-warning"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Add somthing to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getMeToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          const orderData = {
            products: products,
            transaction_id: response.transaction_id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {});
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Total Bill is ₹{getAmount()}</h3>
      {showDropIn()}
    </div>
  );
};

export default BraintreePayment;
