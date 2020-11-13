const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todoName: { type: String },
    date: { type: Date },
    label: { type: String },
    isDone: { type: Boolean, default: false },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
