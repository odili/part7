const blogsRouter = require('express').Router();
const commentRouter = require('./comments');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', {
        username: 1,
        name: 1,
      })
      .populate('comments', { content: 1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const fetchedBlog = await Blog.findById(req.params.id)
      .populate('comments', { content: 1 })
      .populate('user');
    res.json(fetchedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (req, res, next) => {
  if (!req.body.title || !req.body.url) {
    console.log(req.body);
    return res.status(400).json({ error: 'Blog title and url are required' });
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      ...req.body,
      likes: req.body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.json(savedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(blog._id);
      user.blogs = user.blogs.filter(
        ub => ub.toString() !== blog.id.toString()
      );
      await user.save();
      res.status(204).end();
    } else {
      console.log(blog.user, user._id);
      res.status(401).json({ error: 'Unauthorized to delete this blog' });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.use(
  '/:id/comments',
  (req, res, next) => {
    req.id = req.params.id;
    next();
  },
  commentRouter
);

module.exports = blogsRouter;
