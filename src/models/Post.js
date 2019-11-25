const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String],
        required: true
    },
    num_likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [{content: String, user_id: Schema.Types.ObjectId}],
        default: []
    },
    published: {
        type: Boolean,
        required: true
    }
})

module.exports = model('Post', postSchema);