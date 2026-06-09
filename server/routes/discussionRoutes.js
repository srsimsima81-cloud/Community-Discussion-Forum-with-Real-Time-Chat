const express = require("express");
const router = express.Router();

const {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  upvoteDiscussion,
  updateDiscussion,
  deleteDiscussion,
} = require("../controllers/discussionController");

const { protect } = require("../middleware/authMiddleware");


// CREATE
router.post("/", protect, createDiscussion);

// GET ALL
router.get("/", getAllDiscussions);

// GET SINGLE DISCUSSION
router.get("/:id", getDiscussionById);

// UPDATE DISCUSSION
router.put("/:id", protect, updateDiscussion);

// DELETE DISCUSSION
router.delete("/:id", protect, deleteDiscussion);

router.put("/:id/upvote", upvoteDiscussion);

module.exports = router;