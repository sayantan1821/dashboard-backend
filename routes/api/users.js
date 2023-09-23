const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.post("/", async (req, res) => {

  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ msg: "User already exists" });
    }

    user = new User({
      email,
    });

    await user.save();
    return res.status(200).json({ msg: "User Creatyed" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
