import { GET_POSTS, SINGLE_POST, POST_ERROR } from "../action/type";

const initialState = {
  posts: [],
  post: null,
  loading: true,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        post: null,
        posts: payload,
        loading: false,
      };
    case SINGLE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        post: null,
        loading: false,
      };
    default:
      return state;
  }
}
