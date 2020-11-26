const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

// @route - get /api/auth
// @desc - get auth user
// @mode - private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error!");
  }
});

// @route - post /api/auth/login
// @desc - user login
// @mode - public
router.post(
  "/login",
  [
    body("email", "email is required!").isEmail(),
    body("password", "password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // is email is exist
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //   compare password with bcrypt
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //   generating jwt auth token
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 120,
      });

      res.send({ token: token });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
