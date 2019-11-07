const { Router } = require('express')
const router = Router();
const { getPosts, getPost, createPost, editPost, deletePost } = require('../controllers/post.controller')

router.route('/')
    .get(getPosts)
    .post(createPost)

router.route('/:id')
    .get(getPost)
    .put(editPost)
    .delete(deletePost)

module.exports = router;