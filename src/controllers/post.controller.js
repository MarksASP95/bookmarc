const Post = require('../models/Post')
const User = require('../models/User')
const { createOrIncreaseTags } = require('../controllers/tag.controller')

const postController = {}

postController.getPosts = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        // no es busqueda. devolver todos

        await Post.find({}).sort({date: 'desc'})
            .then( posts => {
                User.populate(posts, {path: "author"}, (err, posts) => {
                    res.json(posts)
                })  
            })

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

postController.getSavedPosts = (req, res) => {

}

postController.getPublishedPosts = (req, res) => {

}

postController.getPost = async (req, res) => {  
    const post = Post.findById(req.params.id);
    res.json(post);
}

// use to create a post that is unexistent and publish/save it right away
// USE FOR NEW POSTS ONLY (e.g.: on "NewPost component" to be specific)
postController.createPost = async (req, res) => {
    const { title, author, content, tags, published } = req.body
    const newPost = new Post({
        title: title,
        author: author,
        content: content,
        tags: tags,
        published: published
    })

    await newPost.save((error, result) => {
        if(error){
            res.json({status: `Post could not be created. ${error}`})
            return
        }
        
        published ? createOrIncreaseTags(tags) :  null
        
    })
    res.json({status: 'Post created'})
}

// ---------------------------------------
// THESE ARE FOR EXISTENT POSTS ONLY
// use to publish existent (saved) post
const publishPost = async (id, callback) => {
    await Post.findByIdAndUpdate(id, {published: true}, (error, result) => {
        if(error) { 
            res.json({status: `Post could not be moved to publishes. ${error}`}) 
            return
        }
        callback({status: "Post was moved to publishes!"})
    })
}

// use to save existent (published) post
const savePost = async (id, callback) => {
    await Post.findByIdAndUpdate(id, {published: false}, (error, result) => {
        if(error) { 
            res.json({status: `Post could not be moved to saves. ${error}`}) 
            return
        }
        callback({status: "Post was moved to saves!"})
    })

}
// ---------------------------------------

postController.editPost = async (req, res) => {

    const fullEdit = async () => {
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

    switch(req.body.action) {
        case 'save':
            savePost(req.params.id, (response) => res.json(response))
            break;
        case 'publish':
            publishPost(req.params.id, (response) => res.json(response))
            break;
        case 'full':
            fullEdit()
            break;
        default:
            res.json({status: "No action was sent"})
    }
}

postController.deletePost = async (req, res) => {
    await Post.findOneAndDelete(
        {_id: req.params.id}
    )
    res.json({status: "Post deleted"})
}

module.exports = postController