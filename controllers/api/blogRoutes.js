const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//GET route for blogs
router.get('/', async (req, res) => {
  //pulls blog data from db ordering it from newest to oldest attaches user name and asociated comments with their users
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
        }]
      });
    res.status(200).json(blogData);
  }catch (err) {
    res.status(500).json(err);
  }
})

//GET route for an individual blog post
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
  //returns 404 error if id for post doesnt existin database
    if(!blogData) {
      res.status(404).json({message: 'No blog post found with this ID'})
    }
    res.json(blogData);
  }catch (err) {
    res.status(500).json(err);
  }
})

//POST route for blogs
router.post('/', withAuth, async (req, res) => {
  //creates a req body from user input (see js file) and session data
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newBlog);
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE route deletes blog post with chosen id if session user is the user who created
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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
