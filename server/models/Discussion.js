const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    tags: [String],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    upvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);