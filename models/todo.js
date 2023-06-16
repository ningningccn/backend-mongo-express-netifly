const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  thing: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("todo", todoSchema);
