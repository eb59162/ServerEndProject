const express=require('express')
const router=express.Router();
const auth = require('../config/authenticate');
const{getFreshestStory,addStory, getAllStories, getStoryById, 
    updateStoryByID, deleteStoryByID}=require('../Controlers/ControllerStory')
router.get('/', getAllStories)
router.get('/:id', auth, getStoryById)
router.post('/', auth, addStory)
router.put('/:id', auth, updateStoryByID)
router.delete('/:id', auth, deleteStoryByID)

module.exports=router