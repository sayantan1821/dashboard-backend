const express = require("express");
const router = express.Router();

const Project = require("../../models/Project");
const User = require("../../models/User");
const Transcript = require("../../models/Transcript");

router.post("/getTranscript", async (req, res) => {
    const { email, projectId } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      let transcripts = await Transcript.find({ projectId });
      res.status(200).json(transcripts);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Server error" });
    }
  });

router.post("/", async (req, res) => {
  const { email, projectId, title, description, status } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    let transcript = new Transcript({
        title,
        description,
        status,
        projectId,
        userId: user._id
    })
    await transcript.save();
    return res.status(200).json(transcript)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
