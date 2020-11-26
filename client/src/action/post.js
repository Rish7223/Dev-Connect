import { GET_POSTS, POST_ERROR, SINGLE_POST } from "./type";
import { setAlert } from "./alert";
import axios from "axios";

export const getAllPost = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.map((error) => dispatch(setAlert(error.msg, "dng")));
      }
    } else {
      console.log(err.message);
    }
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${postId}`);
    dispatch({
      type: SINGLE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.map((error) => dispatch(setAlert(error.msg, "dng")));
      }
    } else {
      console.log(err.message);
    }
  }
};

// create a post
export const createPost = (formData, history) => async (dispatch) => {
  const { title, description, postIMG } = formData;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ title, description, postIMG });

  try {
    await axios.post("/api/post", body, config);
    dispatch(setAlert("Post is successfully created!", "succ"));
    history.push("/home");
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.map((error) => dispatch(setAlert(error.msg, "dng")));
      }
    } else {
      console.log(err.message);
    }
  }
};

// edit a post
export const editPost = (formData, postId, history) => async (dispatch) => {
  const { title, description, postIMG } = formData;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ title, description, postIMG });

  try {
    await axios.put(`/api/post/${postId}`, body, config);
    dispatch(setAlert("post is successfully edited", "succ"));
    dispatch(getAllPost());
    history.push("/home");
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.map((error) => dispatch(setAlert(error.msg, "dng")));
      }
    } else {
      console.log(err.message);
    }
  }
};

// delete a post
export const deletePost = (postId, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${postId}`);
    dispatch(setAlert("post is successfully DELETED!", "succ"));
    history.push("/home");
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.map((error) => dispatch(setAlert(error.msg, "dng")));
      }
    } else {
      if (err.response) {
        const errors = err.response.data.errors;
        if (errors.length > 0) {
          errors.map((error) => dispatch(setAlert(error.msg, "dng")));
        }
      } else {
        console.log(err.message);
      }
    }
  }
};
