//אוביקט דמי במקום שליפה מהDB
const stories = [
    {
        id: 'story1', name: "Family1",
        date: {
            houers: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        },
        author: "ester", nav: "../storyFamily.txt", catgory: "families from the area"
    },
    {
        id: 'story2', name: "Girl1",
        date: {
            houers: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds() + 2
        },
        author: "ester", nav: "../storyGirl.txt", category: "families from the patry"
    },

    {
        id: 'story3', name: "Girl2",
        date: {
            houers: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds() + 3
        },
        author: "Ester", nav: "../storyGirl2.txt", category: "families from the patry"
    },
    {
        id: '11', name: "Family1",
        date: {
            houers: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        },
        author: "ester", nav: "../storyFamily.txt", catgory: "families from the area"
    },]
    //כל הפונקציות צריכות שינוי ועדכון מהDB
 //עובד מצוין
exports.getAllStories = (req, res) => {
    res.json(stories)
}
    //עובד מצוין
exports.addStory = (req, res) => {
    const { id, name, date, author, nav, catgory } = req.body
    //Create a new story object
    const newStory = { id, name, date, author, nav, catgory }
    //Add the new story to the array
    stories.push(newStory)
    res.json(stories)
}
    //עובד מצוין
exports.updateStoryByID = (req, res) => {
    //Get the id from the request
    const { id } = req.params
    console.log('update id',id);
    //Get the update story
    const updateStory = req.body
    //Find the index of the story with the given an ID 
    const index = stories.findIndex(str => str.id === id)
    if (index != -1) {
        //If the story is found , update its details in the array
        stories[index] = updateStory
        res.status(200).json({ message: "story details is update" })
    }
    else {
        //If the story is not found ,return an error message
        res.status(400).json({ message: 'story  not found' })
    }
}
    //עובד מצוין
exports.deleteStoryByID = (req, res) => {
    const { id } = req.params
    //Find the index of the story to delate
    const index = stories.findIndex(story => story.id === id)
    if (index != -1) {
        //If the story is found, remove it from the array
        stories.splice(index, 1);
        res.status(200).json({ messge: 'story deleted successfully' })
    }
    else {
        //If the story is not found, return an error message
        res.status(404).json({ message: "story not found!" })
    }
}
    //עובד מצוין
exports.getStoryById = (req, res) => {
    const { id } = req.params;
    //Find the story with the matching ID
    const story = stories.find(story =>  story.id === id )
    //If no story found ,send an error massage
    if (!story) {
        res.status(404).json({ massage: 'story not found' })
    }
    res.json(story)
}
//צריך שיפור
exports.getFreshestStory = (req, res) => {
    const story = stories.filter((s) => {
        s.date.seconds === new Date().getSeconds()
    })
    if (story)
    //     const min=story.map((m)=>{
    // m.date.seconds})
        res.json(story)
}