const { Router } = require('express')
const { getUsers, createUser, getUser } = require('../controllers/user.controller');

const router = Router();

// getPosts (feed: por fecha descendente)
// getPosts (por búsqueda)
// getPost (por id)
// createPost
// editPost (igual que create)
// deletePost

// router.route('/')
//     .get()
//     .post()

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)

module.exports = router;