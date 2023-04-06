const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try{
    const blogData = await Blog.findAll({
             atttibutes: [ 'id', 'post_name', 'post_body', 'date_created'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'date_created'],
            order: [['date_created', 'DESC']],
            include: [{ 
                model: User,
                attributes: ['name'],
            }]
        }]
    })
    const blogs = blogData.map((blog) => blog.get({plain:true}));
    res.render('homepage', {
        blogs,
        logged_in: req.session.logged_in,
    })
}catch (err){
    res.status(500).json(err);
}
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
        atttibutes: [ 'id', 'post_name', 'post_body', 'date_created'],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'date_created'],
                include: [{ 
                    model: User,
                    attributes: ['name'],
                }]
            }]
    })
    if (!blogData){
        res.status(404).json({ messad: 'No blog post found with this ID'});
        return;
    }
    const blogs = blogData.get({plain: true});
    res.render('editBlogPost', {
        blogs,
        logged_in: req.session.logged_in,
        });
    }catch (err){
    res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
