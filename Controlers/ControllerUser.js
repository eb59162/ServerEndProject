const Data = require("../Models/ModelUser")
exports.getAllUsers = async (req, res) => {
    try {
        // if(req.headers.authorization == "admin") {
        const allUsers = await Data.find()
        res.json(allUsers)
        // }else{
        //     res.json("to admin only")
        // }
    } catch (error) {
        console.error("Faild to get users:", error)
        res.status(500).json({ message: "Faild to get users" })
    }
}
exports.addUser = async (req, res) => {
    const { name, email, phone } = req.body
    console.log("name, email,phone",);
    console.log(name, email, phone);
    //Create a new user object
    const newUser = { name, email, phone }

    // const newUser = { name }
    newUser.status = "on"
    // if (email === process.env.ADMINEMAIL && name === process.env.ADMINNAME) {
    //     newUser.role = "admin"
    // }
    const user = await Data.create(newUser)
    if(user)
    res.send({user:user})
else
res.send("error")
}
exports.updateUserByEmail = async (req, res) => {
    console.log("hello");
    //Get the id from the request
    const { email } = req.params
    console.log("email edit", email);
    //Get the update user
    const User = req.body
    console.log("name , email, phone, status");
    console.log(User.name , User.email, User.phone, User.status);
    try {
        const updateUser = await Data.findOneAndUpdate(
            { email: email },
            {
                name: User.name,
                email: User.email,
                phone: User.phone,
                status:User.status,
                new: true
            })
        if (!updateUser) {
            res.status(404).json({ message: 'User not found' })
        }
        res.json(updateUser)
        console.log("status", updateUser)
    } catch (error) {
        console.error('Faild to update user:', error)
        res.status(500).json({ message: 'Faild to update user' })
    }
}
exports.deleteUserByEmail = async (req, res) => {
    const { email } = req.params
    console.log("email", email);
    try {
        const deleteUser = await Data.findOneAndUpdate(
            { email: email }, {
            status: "off",
            new: true
        })
        if (!deleteUser) {
            res.status(404).json({ message: "User not found" })
        }
        console.log("status", deleteUser)
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
// בעדכון יש בעיה לא ברורה
//אני חושבת שכדאי לעשות את השם והמיל של המשתמש כ 
//props שעובר בכל המערכת 
//וכך יהיה אפשר לאחוז בו כשצריך....
//וכן כל משתמש יוכל לשנות רק את עצמו!!!!!!!!!
//הוספתי זמן אמת 
//זה מוצג פעמיים!!!!!!!!!!!!!
