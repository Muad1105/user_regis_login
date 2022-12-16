import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";

function RegisterPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.email &&
      user.password
    ) {
      dispatch(userActions.register(user));
    }
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={user.firstName}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.firstName ? " is-invalid" : "")
            }
            style={{ border: "2px solid #000", borderRadius: "0" }}
          />
          {submitted && !user.firstName && (
            <div className="invalid-feedback">First Name is required</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.lastName ? " is-invalid" : "")
            }
            placeholder="Last Name"
            style={{ border: "2px solid #000", borderRadius: "0" }}
          />
          {submitted && !user.lastName && (
            <div className="invalid-feedback">Last Name is required</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.username ? " is-invalid" : "")
            }
            placeholder="Username"
            style={{ border: "2px solid #000", borderRadius: "0" }}
          />
          {submitted && !user.username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !user.email ? " is-invalid" : "")
            }
            placeholder="email"
            style={{ border: "2px solid #000", borderRadius: "0" }}
          />
          {submitted && !user.email && (
            <div className="invalid-feedback">email is required</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.password ? " is-invalid" : "")
            }
            placeholder="Password"
            style={{ border: "2px solid #000", borderRadius: "0" }}
          />
          {submitted && !user.password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button className="btn btn-primary" style={{ width: "48%" }}>
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Register
          </button>
          <Link
            to="/login"
            className="btn btn-link"
            style={{
              width: "48%",
              border: "1px solid #007BFF",
              background: "#007BFF",
              color: "#fff",
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export { RegisterPage };
