const Data = require("../Models/ModelUser")
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await Data.find()
        res.json(allUsers)
    } catch (error) {
        console.error("Faild to get users:", error)
        res.status(500).json({ message: "Faild to get users" })
    }
}
exports.addUser = async (req, res) => {
    const { id, name,family, email,phone } = req.body
    //Create a new user object
    const newUser = { id, name,family, email,phone }
    const user = await Data.create(newUser)
    res.json(user)
}
exports.updateUserByID = async (req, res) => {
    //Get the id from the request
    const { id } = req.params
    //Get the update user
    const User = req.body
    try {
        const updateUser = await Data.findOneAndUpdate(
            { id: id }, 
            { name: User.name, 
             email: User.email,
              phone: User.phone,
             new: true })
        if (!updateUser) {
            res.status(404).json({ message: 'User not found' })
        }
    

        res.json(updateUser)
    } catch (error) {
        console.error('Faild to update user:', error)
        res.status(500).json({ message: 'Faild to update user' })
    }
}
exports.deleteUserByID = async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await Data.findOneAndDelete({ id: id })
        if (!deleteUser) {
            res.status(404).json({ message: "User not found" })
        }
        res.json(deleteUser)
    } catch (error) {
        console.error('Faild to delete user', error)
        res.status(500).json({ massage: 'Faild to delete user' })
    }
}
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Data.findOne({ id })
        if (!user) {
            res.status(404).json({ message: 'story not found' })
        }
        res.json(user)
    } catch (error) {
        console.error('Faild to get user:', error)
        res.status(500).json({ message: 'Faild to get user' })
    }
}






