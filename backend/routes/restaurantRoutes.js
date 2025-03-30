
const express = require("express") ; 

const authMiddleware = require("../middlewares/authMiddleware")

const {createRestaurantController , getAllRestaurantController , getResaurantByIdController, deleteRestaurantController} = require("../controllers/restaurantControllers")


const router = express.Router() ; 


router.post('/create' , authMiddleware , createRestaurantController) ;

router.get('/getAll' , getAllRestaurantController) ;

router.get('/get/:id' , getResaurantByIdController) ; 

router.delete('/delete/:id' , authMiddleware , deleteRestaurantController ) ; 


module.exports = router ; 