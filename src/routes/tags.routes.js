const { Router } = require('express')
const { getTags, getTag } = require('../controllers/tag.controller')
const router = Router();

router.route('/')
    .get(getTags)

router.route('/:name')
    .get(getTag)

module.exports = router;