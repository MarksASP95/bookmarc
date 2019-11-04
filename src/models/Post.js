const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
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
        required: true
    },
    comments: {
        type: [{content: String, user_id: mongoose.Schema.Types.ObjectId}],
        required: true
    }
})

module.exports = model('Post', postSchema);