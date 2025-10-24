import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  referralCode: { type: String, unique: true },
  referredBy: String,
  referralCount: { type: Number, default: 0 },
  rewardPoints: { type: Number, default: 0 },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
