const express = require("express")
const router = express.Router()

const {getAllMessages} = require("../Controlers/Messages");

router.get('/',getAllMessages);

module.exports = router