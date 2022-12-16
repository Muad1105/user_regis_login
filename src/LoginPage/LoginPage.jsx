import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(username, password, from));
    }
  }

  return (
    <div className="col-md-8 offset-lg-2">
      <h2>Sign In</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ fontWeight: "bold" }}>New user?</p>
        <Link
          to="/register"
          className="btn btn-link"
          style={{ marginBottom: "12px" }}
        >
          Create an account
        </Link>
      </div>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username or email"
            value={username}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !username ? " is-invalid" : "")
            }
            style={{ border: "2px solid #000", borderRadius: "0" }}
          />
          {submitted && !username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !password ? " is-invalid" : "")
            }
            style={{ border: "2px solid #000", borderRadius: "0" }}
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              background: "#333",
              borderRadius: "0",
              borderColor: "#333",
            }}
          >
            {loggingIn && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            <Link to="/home">Sign In</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export { LoginPage };
