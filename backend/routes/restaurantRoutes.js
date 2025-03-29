
const express = require("express") ; 

const authMiddleware = require("../middlewares/authMiddleware")
const {createRestaurantController , getAllRestaurantController , getResaurantByIdController } = require("../controllers/restaurantControllers")


const router = express.Router() ; 


router.post('/create' , createRestaurantController) ;

router.get('/getAll' , getAllRestaurantController) ;

router.get('/get/:id' , getResaurantByIdController) ; 


module.exports = router ; 