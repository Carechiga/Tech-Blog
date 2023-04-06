const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({ 
      attributes: ['id', 'post_name', 'post_body', 'date_created'],
      order: [[ 'date_created', 'DESC']],
      include: [{ 
        model: User,
        attributes: ['name'], 
    },
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'user_id', 'blog_id', 'date_created'],
      include: {
        model: User,
        attributes: ['name'],
      }
    }
  ]});
    res.status(200).json(blogData);
  }catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk({ 
      attributes: ['id', 'post_name', 'post_body', 'date_created'],
      order: [[ 'date_created', 'DESC']],
      include: [{ 
        model: User,
        attributes: ['name'], 
    },
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'user_id', 'blog_id', 'date_created'],
      include: {
        model: User,
        attributes: ['name'],
      }
    }
  ]});
     res.status(200).json(blogData);
    if(!blogData) {
      res.status(404).json({message: 'No blog post found with this ID'})
    }
  }catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      post_name: req.body.post_name,
      post_body: req.body.post_body,
      user_id: req.session.user_id,
    });
    console.log(newBlog);
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
