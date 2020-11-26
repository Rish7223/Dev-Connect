import React, { Fragment } from "react";
import Alert from "./utils/Alert";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <Fragment>
      <div className="landing">
        <h1>
          READ & WRITE the BEST in <span>BLOGS</span>
        </h1>
        <p>
          Login or signup to contribute to this not for profit website & help
          the needed ones with your knowledge.
        </p>
        <Link to="/register">
          <button className="btn-lg">Register for free.</button>
        </Link>
      </div>
      <Alert />
    </Fragment>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
