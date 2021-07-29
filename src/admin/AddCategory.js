import React from "react";
import Base from "../components/base";
import Footer from "../components/Footer";
import { useState } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const returnButton = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-m btn-info mb-3" to="/admin/dashboard">
          Go Back
        </Link>
      </div>
    );
  };

  const handleChange = (e) => {
    setError("");
    setCategory(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
    createCategory(user._id, token, { category }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setCategory("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-info">Category created scuccessfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };

  const categoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={category}
          autoFocus
          required
          placeholder="For Ex. Organic"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <>
      <div>
        <Base
          title="Create a new Category"
          description=" "
          className="container bg-white p-4"
        >
          <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
              {successMessage()}
              {warningMessage()}
              {categoryForm()}
              {returnButton()}
            </div>
          </div>
        </Base>
      </div>
      <Footer />
    </>
  );
};

export default AddCategory;
