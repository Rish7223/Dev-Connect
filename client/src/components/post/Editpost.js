import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, editPost } from "../../action/post";
import Spinner from "../utils/Spinner";
import Alert from "../utils/Alert";

const Editpost = ({
  props,
  editPost,
  getPost,
  post: { post, loading },
  history,
}) => {
  const postId = props.match.params.id;
  useEffect(() => {
    getPost(postId);
    post &&
      setFormData({
        title: post.title,
        description: post.description,
        postIMG: post.postIMG,
      });
    // eslint-disable-next-line
  }, [postId, getPost]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postIMG: "",
  });

  let { title, description, postIMG } = formData;

  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    formData.description = description.split("<br>");
    editPost(formData, postId, history);
    setFormData({
      title: "",
      description: "",
      postIMG: "",
    });
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="createPost">
        <div className="form">
          <h1>Edit the Post</h1>
          <form onSubmit={onsubmit}>
            <input
              type="text"
              placeholder="Post title"
              name="title"
              value={title}
              onChange={(e) => onchange(e)}
            />
            <input
              type="text"
              placeholder="img-url *jpeg, png extension"
              name="postIMG"
              value={postIMG}
              onChange={(e) => onchange(e)}
            />
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="description...  (add br tag at the end to brake the line)"
              value={description}
              onChange={(e) => onchange(e)}
            ></textarea>
            <button className="btn-lg">Edit-Post</button>
          </form>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
};

Editpost.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost, editPost })(
  withRouter(Editpost)
);
