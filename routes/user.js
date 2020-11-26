const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user");
const Post = require("../models/post");
const router = express.Router();

// @route - post /api/user
// @desc - register a user
// @mode - public
router.post(
  "/",
  [
    body("username", "username is required!").not().isEmpty(),
    body("email", "provide a valid email!").isEmail(),
    body("password", "password must be in between 6 - 18!").isLength({
      min: 6,
      max: 18,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { username, email, password } = req.body;

    try {
      // check if user is already registered
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "email is exists! try different one." }] });
      }
      user = new User({
        username,
        email,
        password,
      });

      // hashing the password and save the user
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      // generating jwt token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 120,
      });

      res.send({ token: token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ type: "server error" });
    }
  }
);

// @route - delete /api/user
// @desc - delete user account
// @mode - private
router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user });
    await User.findByIdAndDelete(req.user);
    res.send("account deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ type: "server error" });
  }
});

module.exports = router;
