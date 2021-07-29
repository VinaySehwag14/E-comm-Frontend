import React, { useEffect, useState } from "react";
import Base from "./base";
import BraintreePayment from "./BraintreePayment";
import Card from "./Card";
import { loadCart } from "./cartHelper";
import Footer from "./Footer";
import "./mainStyle.css";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeCartBt={true}
            addCartBt={false}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  // const loadCheckOut = () => {
  //   return <div>this section for checkout</div>;
  // };
  return (
    <>
      <Base title="Check out" description=" ">
        <div className="row text-center">
          <div className="col-3">
            {products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3>Add some products</h3>
            )}
          </div>

          <div className="col-6">
            <BraintreePayment products={products} setReload={setReload} />
          </div>
        </div>
      </Base>
      <Footer />
    </>
  );
};

export default Cart;
