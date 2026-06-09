const Discussion = require("../models/Discussion");
const Comment = require("../models/Comment");

// CREATE DISCUSSION
const createDiscussion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const discussion = await Discussion.create({
      title,
      description,
      tags,
      author: req.user ? req.user.id : null,
    });

    res.json(discussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL DISCUSSIONS
const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    const discussionsWithCounts = await Promise.all(
      discussions.map(async (discussion) => {
        const commentCount = await Comment.countDocuments({
          discussionId: discussion._id,
        });

        return {
          ...discussion.toObject(),
          commentCount,
        };
      })
    );

    res.json(discussionsWithCounts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET SINGLE DISCUSSION
const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate("author", "name email");

    if (!discussion) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(discussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const upvoteDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  discussion.upvotes += 1;
  await discussion.save();

  res.json(discussion);
};

// UPDATE DISCUSSION
const updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(
      req.params.id
    );

    if (!discussion) {
      return res
        .status(404)
        .json({ message: "Discussion not found" });
    }

    if (
      discussion.author &&
      discussion.author.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized" });
    }

    discussion.title =
      req.body.title || discussion.title;

    discussion.description =
      req.body.description ||
      discussion.description;

    discussion.tags =
      req.body.tags || discussion.tags;

    await discussion.save();

    res.json(discussion);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE DISCUSSION
const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(
      req.params.id
    );

    if (!discussion) {
      return res
        .status(404)
        .json({ message: "Discussion not found" });
    }

    if (
      discussion.author &&
      discussion.author.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized" });
    }

    await discussion.deleteOne();

    res.json({
      message: "Discussion deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  upvoteDiscussion,
  updateDiscussion,
  deleteDiscussion,

};