import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Base from "../components/base";
import Footer from "../components/Footer";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left pt-2 p-5 ">
            <form>
              <div className="form-group ">
                <label className="text-dark">Email</label>
                <input
                  onChange={handleChange("email")}
                  value={email}
                  className="form-control"
                  type="email"
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Password</label>
                <input
                  onChange={handleChange("password")}
                  value={password}
                  className="form-control"
                  type="password"
                />
              </div>
              <button onClick={onSubmit} className="btn btn-warning btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Base title="Sign In" description=" ">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </Base>
      <Footer />
    </>
  );
};

export default Signin;
