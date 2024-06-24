const Data = require('../Models/ModelStory')
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Data.find()
        res.json(stories)
    } catch (error) {
        console.error('Faild to get stories:', error)
        res.status(500).json({ message: 'Faild to get stories' })
    }
}
exports.addStory = async (req, res) => {
    const { id, Name, Clock, Author, Nav, Category,Like } = req.body
    //Create a new story object
    const newStory = { id, Name, Clock, Author, Nav, Category,Like }
    //Add the new story to the array
    // stories.push(newStory)
    const story = await Data.create(newStory)
    res.json(story)
}
exports.updateStoryByID = async (req, res) => {
    //Get the id from the request
    const { id } = req.params
    //Get the update story
    const Story = req.body
    try {
        const updateStory = await Data.findOneAndUpdate(
            { id: id },
            { Name: Story.Name ,
             Clock: Story.Clock ,
            Author: Story.Author, 
             Nav: Story.Nav ,
            Category: Story.Category ,
             Like: Story.Like ,
             new: true },
        )
        if (!updateStory) {
            res.status(404).json({ message: 'Story not found' })
        }
        res.json(updateStory)
    } catch (error) {
        console.error('Faild to update story:', error)
        res.status(500).json({ message: 'Faild to update story' })
    }
}
exports.deleteStoryByID = async (req, res) => {
    const { id } = req.params
    try {
        const deleteStory = await Data.findOneAndDelete({ id: id })
        if (!deleteStory) {
            res.status(404).json({ message: "Story not found!" })
        }
        res.json(deleteStory)
    } catch (error) {
        console.error('Faild to delete story', error)
        res.status(500).json({ massage: 'Faild to delete story' })
    }
}
exports.getStoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const story = await Data.findOne({ id })
        if (!story) {
            res.status(404).json({ message: 'story not found' })
        }
        res.json(story)
    } catch (error) {
        console.error('Faild to get stroy:', error)
        res.status(500).json({ message: 'Faild to get story' })
    }
}
//צריך שיפור
// exports.getFreshestStory = (req, res) => {
//     const story = stories.filter((s) => {
//         s.clock.seconds === new Date().getSeconds()
//     })
//     if (story)
//         //     const min=story.map((m)=>{
//         // m.date.seconds})
//         res.json(story)
// }



