const Tag = require('../models/Tag')

const tagController = {}

tagController.getTags = async (req, res) => {
    const tags = await Tag.find()
    res.json(tags)
}

tagController.getTag = async (req, res) => {
    const tag = await Tag.findOne({name: req.params.name})
    res.json(tag)
}

tagController.createOrIncreaseTags = async (tagNames) => {

    let tagQueries = []
    tagNames.forEach(tagName => {
        tagQueries.push({name: tagName})
    })

    let update = { $inc: {num_use: 0.5} }
    let options = { upsert: true, setDefaultsOnInsert: false }

    // Find the document
    await Tag.findOneAndUpdate({$or: tagQueries}, update, options, function(error, result) {
        if (error) {
            console.log('Error con las tags')
            return
        };

        // do something with the document
    });
}

module.exports = tagController