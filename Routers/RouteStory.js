const express=require('express')
const router=express.Router();
const auth = require('../config/authenticate');
const{getFreshestStory,addStory, getAllStories, getStoryById, 
    updateStoryByEmail, deleteStoryByEmail}=require('../Controlers/ControllerStory')
router.get('/', getAllStories)
// router.get('/:id', auth, getStoryById)
// router.post('/', auth, addStory)
// router.put('/:email', auth, updateStoryByEmail)
// router.delete('/:email', auth, deleteStoryByEmail)
router.get('/:id', getStoryById)
router.post('/', addStory)
router.put('/:email', updateStoryByEmail)
router.delete('/:email', deleteStoryByEmail)

module.exports=router