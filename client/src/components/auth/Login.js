import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "../utils/Alert";
import { loginUser } from "../../action/auth";
import { connect } from "react-redux";

const Register = ({ loginUser, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
    setFormData({
      email: "",
      password: "",
    });
  };
  return isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <Fragment>
      <div className="auth">
        <div className="form">
          <h1>Login to Account</h1>
          <p>
            don't have account? <Link to="/register">Sign-up</Link>
          </p>
          <form onSubmit={onsubmit}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onchange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onchange(e)}
            />
            <button className="btn btn-primary" type="submit">
              login
            </button>
          </form>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
};

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Register);
