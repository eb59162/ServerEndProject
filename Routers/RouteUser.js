const express=require('express')
const router=express.Router();
const{addUser, getAllUsers, getUserById,
updateUserByID, deleteUserByID,getUserByName}=require('../Controlers/ControllerUser')
//יש לבדוק את כל הקריאות עם ה ThunderClient
router.get('/',getAllUsers)
router.get('/:id', getUserById)
router.get('/name/:name', getUserByName)
router.post('/', addUser)
router.put('/:id', updateUserByID)
router.delete('/:id',deleteUserByID)

module.exports=router