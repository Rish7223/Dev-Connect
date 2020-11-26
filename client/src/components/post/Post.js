import React, { Fragment, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../utils/Spinner";
import PropTypes from "prop-types";
import { getPost, deletePost } from "../../action/post";
import moment from "moment";
import Alert from "../utils/Alert";

const Post = ({
  post: { loading, post },
  props,
  getPost,
  deletePost,
  auth: { user },
  history,
}) => {
  const postId = props.match.params.id;
  useEffect(() => {
    getPost(postId);
  }, [postId, getPost]);
  return loading ? (
    <Spinner />
  ) : (
    post && user && (
      <Fragment>
        <div className="single-post">
          <div className="data">
            <h1>{post.title}</h1>
            <img src={post.postIMG} alt="post-pic" />
            <div className="info">
              <p>
                by - <span className="author">{post.author}</span>
              </p>
              <p>{moment(post.data).format("DD-MMM-YYYY")}</p>
            </div>
            <div className="text">
              {post.description.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
            <hr />
            {post.user === user._id && (
              <div className="author-control">
                <Link to={`/editpost/${post._id}`}>
                  <button className="btn-mid">Edit-post</button>
                </Link>
                <button
                  className="btn-mid"
                  onClick={() => {
                    const confirm = window.confirm(
                      "Do you want to delete this post!"
                    );
                    if (confirm) {
                      deletePost(post._id, history);
                    }
                  }}
                >
                  delete-post
                </button>
              </div>
            )}
          </div>
        </div>
        <Alert />
      </Fragment>
    )
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, deletePost })(
  withRouter(Post)
);
