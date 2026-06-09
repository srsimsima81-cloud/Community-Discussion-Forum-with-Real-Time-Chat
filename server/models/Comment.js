const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    discussionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
    user: String,
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);