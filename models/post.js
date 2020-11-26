const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 80,
  },
  description: {
    type: Array,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postIMG: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
