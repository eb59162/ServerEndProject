const express=require('express')
const router=express.Router();
const auth = require('../config/authenticate');
const{addUser, getAllUsers, getUserById,
    updateUserByEmail,deleteUserByEmail}=require('../Controlers/ControllerUser')
// router.get('/',auth, getAllUsers)
// router.get('/:id', getUserById)
// router.post('/', addUser)
// router.put('/:email', auth, updateUserByEmail)
// router.delete('/:email', auth, deleteUserByEmail)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', addUser)
router.put('/:email', updateUserByEmail)
router.delete('/:email', deleteUserByEmail)

module.exports = router