
const express = require('express')
const {testUserController} = require('../controllers/testControllers')

// router object
const router = express.Router()


// routes GET | POST | UPDATE | DELETE 



router.get('/test-user' , testUserController)

router.get('/test-json', (req, res) => {
    res.json({ message: 'Welcome to the test route!' });
});

router.get('/test-display', (req, res) => {
    res.send(
        "<h1>Welcom to the test route !</h1>"
    );
});



module.exports = router 



