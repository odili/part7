const commentRouter = require('express').Router({ mergeParams: true });
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentRouter.get('/', async (req, res, next) => {
  let id = req.id;
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

commentRouter.post('/', async (req, res, next) => {
  let id = req.id;
  const commentedBlog = await Blog.findById(req.body.blog);
  try {
    if (!req.body.content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const newComment = new Comment(req.body);
    const comment = await newComment.save();
    commentedBlog.comments = commentedBlog.comments.concat(comment.id);
    await commentedBlog.save();
    res.json(comment.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = commentRouter;
