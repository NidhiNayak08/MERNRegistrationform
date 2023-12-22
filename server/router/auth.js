const express = require("express");
const User = require("../model/userSchema");

const router = express.Router();
require("../db/conn");
router.get("/", (req, res) => {
  res.send("home haha");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || cpassword) {
    return res.status(422).json({
      error: "fill all fields",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        error: "email already registered",
      });
    }
    const user = new User({ name, email, phone, work, password, cpassword });
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
