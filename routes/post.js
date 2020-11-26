const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/user");
const Post = require("../models/post");
const router = express.Router();

// @route - post /api/post
// @desc - create a post
// @mode - private
router.post(
  "/",
  [
    auth,
    body("title", "post title is required!").not().isEmpty(),
    body("description", "description is required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { title, description, postIMG } = req.body;
    let data = { description: description, title: title, user: req.user };
    if (postIMG !== "") {
      data.postIMG = postIMG;
    }

    try {
      const authuser = await User.findById(req.user);
      data.author = authuser.username;
      const post = new Post(data);
      await post.save();
      res.status(201).send(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ type: "server error" });
    }
  }
);

// @route - put /api/post/:id
// @desc - update a post
// @mode - private
router.put(
  "/:id",
  [
    auth,
    body("title", "post title is required!").not().isEmpty(),
    body("description", "post description is required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { title, description, postIMG } = req.body;
    let data = { description: description, title: title, user: req.user };
    if (postIMG !== "" && postIMG !== null && postIMG) {
      data.postIMG = postIMG;
    } else {
      data.postIMG =
        "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60";
    }

    try {
      const Profile = await User.findById(req.user);
      data.name = Profile.name;
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
      );
      if (!post) {
        return res.status(400).send({ errors: [{ msg: "invalid postId" }] });
      }
      res.send(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ type: "server error" });
    }
  }
);

// @route - get /api/post/:id
// @desc - get a post by id
// @mode - private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({ errors: [{ msg: "invalid postId" }] });
    }
    res.send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ type: "server error" });
  }
});

// @route - delete /api/post/:id
// @desc - delete a post
// @mode - private
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({ errors: [{ msg: "Invalid postId" }] });
    }
    await post.deleteOne();
    res.send({ msg: "post is deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ type: "server error" });
  }
});

// @route - get /api/post/
// @desc - get all posts
// @mode - private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ type: "server error" });
  }
});

module.exports = router;
