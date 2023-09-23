const express = require("express");
const router = express.Router();

const Project = require("../../models/Project");
const User = require("../../models/User");

router.post("/getProject", async (req, res) => {
  console.log(req.body)
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user);
    let projects = await Project.find({ userId: user._id });
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { email, projectName } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user)
    const project = new Project({
      title: projectName,
      userId: user._id,
    });
    await project.save();
    return res.status(200).json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
