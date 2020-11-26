import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../action/post";
import Alert from "../utils/Alert";

const Createpost = ({ createPost, history }) => {
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
    createPost(formData, history);
    setFormData({
      title: "",
      description: "",
      postIMG: "",
    });
  };

  return (
    <Fragment>
      <div className="createPost">
        <div className="form">
          <h1>Create a Post</h1>
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
            <button className="btn-lg">Create-Post</button>
          </form>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
};

Createpost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(withRouter(Createpost));
