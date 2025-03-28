
const express = require("express") ; 

const authMiddleware = require("../middlewares/authMiddleware")
const {createRestaurantController } = require("../controllers/restaurantControllers")


const router = express.Router() ; 


router.post('/create' , createRestaurantController) ;


module.exports = router ; 