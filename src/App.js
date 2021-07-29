import React, { useEffect, useState } from "react";
import Base from "./components/base";
import "../src/components/mainStyle.css";
import Card from "./components/Card";
import Footer from "./components/Footer";
import { getAllProducts } from "./admin/helper/adminapicall";
// import Carousel from "./components/carousel";

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      console.log("Apps data", data);
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <>
      <Base title="Kisaan Ki Dukaan" description="">
        {/* <Carousel /> */}
        <div />
        <div className="row text-center">
          <div className="row ">
            {products.map((product, index) => {
              return (
                <div key={index} className="col-3 mb-5">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </Base>
      <Footer />
    </>
  );
};

export default App;
