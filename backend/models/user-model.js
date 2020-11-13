const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  todos: [{ type: mongoose.Types.ObjectId, required: true, ref: "Todo" }],
});

module.exports = mongoose.model("User", userSchema);
