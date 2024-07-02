const express=require('express')
const router=express.Router();
const{addUser, getAllUsers, getUserById,
updateUserByID, deleteUserByID}=require('../DataBase/Controlers/ControllerUser')
router.get('/',getAllUsers)
router.get('/:id', getUserById)
router.post('/', addUser)
router.put('/:id', updateUserByID)
router.delete('/:id',deleteUserByID)

module.exports=router