const Post = require('../models/Post')

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
    await newPost.save()
    res.json({status: 'Post created'})
}

module.exports = postController