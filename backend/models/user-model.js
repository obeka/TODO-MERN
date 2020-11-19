const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, minlength: 3 },
  todos: [{ type: mongoose.Types.ObjectId, required: true, ref: "Todo" }],
  signupType: { type: String, default: "manuel" },
});

module.exports = mongoose.model("User", userSchema);
