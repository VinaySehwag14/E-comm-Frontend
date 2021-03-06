import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Base from "../components/base";
import Footer from "../components/Footer";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteACategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      console.log(data);
      if (data && data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <>
      <Base title="Welcome admin" description="Manage Categories here">
        <h2 className="mb-4">All Categories:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total 3 Categories</h2>

            {categories.map((category, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className=" text-left">{category.category}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn text-white btn-warning"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteACategory(category._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
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

export default ManageCategories;
