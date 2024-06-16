//אוביקט דמי במקום שליפה מהDB
const users = [
    {
        id: '2323', 
        name: 'Shalom',
        email: "Shalom@.com",
        phone:"058-6565450",
    },
    {
        id: '59776',
        name: 'David',
        email: "David@.com",
        phone:"054-3224328",
    },
    {
        id: '534', 
        name: 'Meir',
        email: "Meir@.com",
        phone:"058-6565450",
    }, 
    {
        id: '586',
        name: 'Chaim',
        email: "Chaim@.com",
        phone:"053-3134345",
    },
]
// צריכים שיפור עם הDB 
exports.getAllUsers = (req, res) => {
    res.json(users)
}
exports.addUser = (req, res) => {
    const { id, name, email } = req.body
    //Create a new user object
    const newUser = { id, name, email }
    //Add the new user to the array
    users.push(newUser)
    res.json(users)
}
exports.updateUserByID = (req, res) => {

    //Get the id from the request
    const { id } = req.params
    //Get the update user
    const updateUser = req.body
    //Find the index of the user with the given an ID 
    const index = users.findIndex(user => user.id === id)
    if (index != -1) {
        //If the user is found ,update its details in the array
        users[index] = updateUser
        res.status(200).json({ message: "user details is update" })
    }
    else {
        //If the user is not found ,return an error message
        res.status(400).json({ message: 'user  not found' })
    }
}

exports.deleteUserByID = (req, res) => {
    const { id } = req.params
console.log("delete id", id);
    //Find the index of the user to delate
    const index = users.findIndex(user => user.id === id)
    console.log('index', index);
    if (index != -1) {
        //If the user is found, remove it from the array
        users.splice(index, 1);
        res.status(200).json({ messge: 'user deleted successfully' })
    }
    else {
        //If the user is not found, return an error message
        res.status(404).json({ message: "user not found!" })
    }
}
exports.getUserById = (req, res) => {
    const { id } = req.params;
    //Find the user with the matching ID
    const user = users.find(user =>  user.id === id)
    
    //If no user found ,send an error responce
    if (!user) {
        res.status(404).json({ massage: 'user not found' })
    }
    res.json(user)
}
exports.getUserByName = (req, res) => {
    const { name } = req.params;
    //Find the user with the matching name
    const user = users.find(user => user.name === name)
    //If no user found ,send an error responce
    if (!user) {
        res.status(404).json({ massage: 'user not found' })
    }
    res.json(user)
}






