import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const guestLink = (
    <Fragment>
      <div className="buttons">
        <Link to="/login">
          <button className="btn-mid">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn-mid">Register</button>
        </Link>
      </div>
      <div className="mob-nav">
        <Link to="/login">
          <button className="btn-mid">
            <i className="fa fa-sign-in"></i>
          </button>
        </Link>
        <Link to="/register">
          <button className="btn-mid">
            <i className="fa fa-user-plus"></i>
          </button>
        </Link>
      </div>
    </Fragment>
  );

  const authLink = (
    <Fragment>
      <div className="buttons">
        <Link to="/home">
          <button className="btn-mid">Post</button>
        </Link>
        <Link to="/createpost">
          <button className="btn-mid">Create-post</button>
        </Link>
        <button
          className="btn-mid"
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      </div>
      <div className="mob-nav">
        <Link to="/home">
          <button className="btn-mid">
            <i className="fa fa-home"></i>
          </button>
        </Link>
        <Link to="/createpost">
          <button className="btn-mid">
            <i className="fa fa-plus"></i>
          </button>
        </Link>
        <button
          className="btn-mid"
          onClick={() => {
            logout();
          }}
        >
          <i className="fa fa-sign-out"></i>
        </button>
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      <nav className="navbar">
        <Link className="navbar-brand" to="/">
          <i className="fa fa-fire"></i> Blogging
        </Link>
        {isAuthenticated ? authLink : guestLink}
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  logout: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { logout })(Navbar);
