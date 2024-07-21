const express=require('express')
const router=express.Router();
const auth = require('../config/authenticate');
const{addUser, getAllUsers, getUserById,
updateUserByID, deleteUserByID}=require('../Controlers/ControllerUser')
router.get('/',auth, getAllUsers)
router.get('/:id', getUserById)
router.post('/', addUser)
router.put('/:id', auth, updateUserByID)
router.delete('/:id', auth, deleteUserByID)

module.exports = router