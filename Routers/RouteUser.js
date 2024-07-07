const express=require('express')
const router=express.Router();
const auth = require('../config/authenticate');
const{addUser, getAllUsers, getUserById,
updateUserByID, deleteUserByID,getUserByName}=require('../Controlers/ControllerUser')
//יש לבדוק את כל הקריאות עם ה ThunderClient
router.get('/', getAllUsers)
router.get('/:id', auth, getUserById)
router.get('/name/:name', auth, getUserByName)
router.post('/', addUser)
router.put('/:id', auth, updateUserByID)
router.delete('/:id', auth, deleteUserByID)

module.exports = router