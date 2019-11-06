const { Router } = require('express')
const router = Router();
const { getPosts, getPost, createPost } = require('../controllers/post.controller')

router.route('/')
    .get(getPosts)
    .post(createPost)

router.route('/:id')
    .get(getPost)

module.exports = router;