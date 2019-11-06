const User = require('../models/User')

const userController = {}

userController.getUsers = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        // busqueda sin parametros => devolver todos
        const users = await User.find()
        res.json(users)
    }
    else {
        // find by parameters
        const { username, name } = req.query
        const users = await User.find({
            username: new RegExp(username),
            name: new RegExp(name)
        })
        res.json(users)
    }
}

userController.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
}

userController.createUser = async (req, res) => {

    const { username, name, dob } = req.body
    const newUser = new User({
        username: username,
        name: name,
        dob: dob
    })
    await newUser.save()
    res.json({status: 'User created'})
}

module.exports = userController