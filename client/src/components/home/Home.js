import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPost } from "../../action/post";
import Postlist from "./Postlist";
import Spinner from "../utils/Spinner";
import Alert from "../utils/Alert";

const Home = ({ auth: { loading, user }, getAllPost, post: { posts } }) => {
  useEffect(() => {
    getAllPost();
  }, [getAllPost]);
  return loading ? (
    <Spinner />
  ) : (
    user && (
      <Fragment>
        <div className="home">
          <h5>
            Welcome <span className="author">{user && user.username}</span>
          </h5>
          <div className="post">
            {posts.length > 0 && <Postlist posts={posts} />}
          </div>
        </div>
        <Alert />
      </Fragment>
    )
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getAllPost })(Home);
