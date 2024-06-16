const express=require('express')
const router=express.Router();

const{getFreshestStory,addStory, getAllStories, getStoryById, 
    updateStoryByID, deleteStoryByID}=require('../Controlers/ControllerStory')
//יש לבדוק את כל הקריאות עם ה ThunderClient

router.get('/',getAllStories)
router.get('/:id', getStoryById)
router.post('/', addStory)
router.put('/:id', updateStoryByID)
router.delete('/:id',deleteStoryByID)

// router.get('/fresh',getFreshestStory)
module.exports=router