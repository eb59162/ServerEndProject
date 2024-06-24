const express=require('express')
const router=express.Router();
const auth = require('../config/authenticate');
const{getFreshestStory,addStory, getAllStories, getStoryById, 
    updateStoryByID, deleteStoryByID}=require('../Controlers/ControllerStory')
//יש לבדוק את כל הקריאות עם ה ThunderClient

router.get('/', getAllStories)
router.get('/:id', auth, getStoryById)
router.post('/', auth, addStory)
router.put('/:id', auth, updateStoryByID)
router.delete('/:id', auth, deleteStoryByID)

// router.get('/fresh', getFreshestStory)
module.exports=router