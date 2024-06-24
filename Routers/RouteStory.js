const express=require('express')
const router=express.Router();

const{getFreshestStory,addStory, getAllStories, getStoryById, 
    updateStoryByID, deleteStoryByID}=require('../Controlers/ControllerStory')
router.get('/',getAllStories)
router.get('/:id', getStoryById)
router.post('/', addStory)
router.put('/:id', updateStoryByID)
router.delete('/:id',deleteStoryByID)

// router.get('/fresh',getFreshestStory)
module.exports=router