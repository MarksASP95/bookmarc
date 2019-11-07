const Post = require('../models/Post')
const { createOrIncreaseTags } = require('../controllers/tag.controller')

const postController = {}

postController.getPosts = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        // no es busqueda. devolver todos
        const posts = await Post.find()
        res.json(posts)
    }
    else {
        // find by parameters
        const { title, author, tags } = req.query;
        const posts = await Post.find({
            title: new RegExp(title),
            author: new RegExp(author),
            tags: {
                $in: [tags]
            }
        })
        res.json(posts)
    }
}

postController.getPost = async (req, res) => {  
    const post = Post.findById(req.params.id);
    res.json(post);
}

postController.createPost = async (req, res) => {
    const { title, author, content, tags } = req.body
    const newPost = new Post({
        title: title,
        author: author,
        content: content,
        tags: tags
    })

    await newPost.save((error, result) => {
        if(error){
            res.json({status: `Post could not be created. ${error}`})
            return
        }
        
        createOrIncreaseTags(tags)
        
    })
    res.json({status: 'Post created'})
}

postController.editPost = async (req, res) => {
    const { title, content, tags } = req.body
    await Post.findOneAndUpdate(
        {_id: req.params.id},
        {
            title: title,
            content: content,
            tags: tags
        }
    )
    res.json({status: "Post edited"})
}

postController.deletePost = async (req, res) => {
    await Post.findOneAndDelete(
        {_id: req.params.id}
    )
    res.json({status: "Post deleted"})
}

module.exports = postController