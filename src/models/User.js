const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    saved_posts: {
        type: [Schema.Types.ObjectId],
        ref: 'Post',
        default: []
    }
},
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)