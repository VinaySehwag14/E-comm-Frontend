import React, { useEffect, useState } from "react";
import Base from "../components/base";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    updatedProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    loading,
    error,
    updatedProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });

        preloadCategories();
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            image: "",
            stock: "",
            loading: false,
            updatedProduct: data.name,
          });
        }
      }
    );
  };

  const successMessage = () => (
    <div
      className="alert alert-warning mt-3"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      <h4>{updateProduct} updated successfully</h4>
    </div>
  );

  const errorMessage = (error) => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error} occured , unsuccessfull</h4>
    </div>
  );

  const createProductForm = () => (
    <form className="mb-3" onSubmit={onSubmit}>
      {/* <h1>Post image</h1> */}
      <div className="form-group">
        <label className="btn btn-block btn-warning">
          <input
            onChange={handleChange("image")}
            type="file"
            name="image"
            accept="image/*"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          name="image"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          name="image"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.category}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-info mb-3"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <>
      <Base
        title="Update a Product"
        description=" "
        className="container bg-white p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-info mb-3">
          Go Back
        </Link>
        <div className="row bg-white text-black rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {createProductForm()}
          </div>
        </div>
      </Base>
      <Footer />
    </>
  );
};

export default UpdateProduct;
