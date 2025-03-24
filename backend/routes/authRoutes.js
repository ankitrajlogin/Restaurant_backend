const express = require('express')
const {registerController , loginController} = require("../controllers/authControllers")

const router = express.Router() 

// routes 
// register || POST

router.post('/register' , registerController) ; 

router.post('/login' , loginController)


// Exports the router instance so it can be used in other files
module.exports = router ; 
