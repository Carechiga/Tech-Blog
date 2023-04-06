const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

//GET route to display blog posts with user id that matches the logged in user
router.get('/', withAuth, async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
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
        const blogs = blogData.map((blog) => blog.get({plain:true}));
        //tells handle bars to use dashboard.handlebars as html body 
        res.render('dashboard', {
            blogs,
            logged_in: req.session.logged_in,
        }) 
    }catch (err){
        res.status(500).json(err);
    }
});

router.get ('/edit/:id', withAuth, async (req, res) => {
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
        res.status(404).json({ message: 'No blog post found with this ID'});
        return;
    }
    const blog = blogData.get({plain: true});
    res.render('editBlogPost', {
        blog,
        logged_in: req.session.logged_in,
        });
    }catch (err){
    res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('createPost', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;