import express from "express";
import shortid from "shortid";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, referredBy } = req.body;
    const referralCode = shortid.generate();

    const user = new User({
      name,
      email,
      referralCode,
      referredBy: referredBy || null,
    });
    await user.save();

    if (referredBy) {
      const referrer = await User.findOne({ referralCode: referredBy });
      if (referrer) {
        referrer.referralCount += 1;
        referrer.rewardPoints += 10; 
        await referrer.save();
      }
    }

    res.status(201).json({
      message: "User registered successfully",
      referralCode,
      name: user.name,
      email:user.email,
      referralCount: user.referralCount,
      rewardPoints: user.rewardPoints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User sdfsdfsdf not found" });

    res.json({
      message: "Login successful",
      referralCode: user.referralCode,
      name: user.name,
      email:user.email,
      referralCount: user.referralCount,
      rewardPoints: user.rewardPoints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/user/:referralCode", async (req, res) => {
  try {
    const user = await User.findOne({ referralCode: req.params.referralCode });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/user/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/track", async (req, res) => {
  try {
    const { referralCode, event } = req.body; 
    const referrer = await User.findOne({ referralCode });
    if (!referrer) return res.status(404).json({ message: "Referrer not found" });

    let points = 0;
    if (event === "opened") points = 2;
    else if (event === "installed") points = 3;
    else if (event === "signup") points = 5;

    referrer.rewardPoints += points;
    await referrer.save();

    res.json({ message: `${event} tracked`, newPoints: referrer.rewardPoints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find().sort({ rewardPoints: -1 }).limit(10);
    res.json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
