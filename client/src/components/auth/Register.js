import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "../utils/Alert";
import { registerUser } from "../../action/auth";
import { connect } from "react-redux";
import { setAlert } from "../../action/alert";

const Register = ({
  registerUser,
  setAlert,
  auth: { isAuthenticated, loading },
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { username, email, password, confirm } = formData;
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setAlert("password not matched!", "dng");
    } else {
      registerUser(formData);
    }
    setFormData({
      username: "",
      email: "",
      password: "",
      confirm: "",
    });
  };
  return !loading && !isAuthenticated ? (
    <Fragment>
      <div className="auth">
        <div className="form">
          <h1>Create Account</h1>
          <p>
            Already have an account <Link to="/login">Sign-in</Link>
          </p>
          <form onSubmit={onsubmit}>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => onchange(e)}
            />
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
            <input
              type="password"
              placeholder="Confirm"
              name="confirm"
              value={confirm}
              onChange={(e) => onchange(e)}
            />
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <Alert />
    </Fragment>
  ) : (
    <Redirect to="/home" />
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser, setAlert })(Register);
