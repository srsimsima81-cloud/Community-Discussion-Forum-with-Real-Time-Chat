const Comment = require("../models/Comment");

const addComment = async (req, res) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
};

const getComments = async (req, res) => {
  const comments = await Comment.find({
    discussionId: req.params.id,
  });

  res.json(comments);
};

module.exports = { addComment, getComments };