
const express = require("express") ; 
const {getUserController , updateUserController , updatePasswordController} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router() ; 


router.get('/getUser' , authMiddleware ,  getUserController)  ; 

router.post('/updateUser' , authMiddleware , updateUserController) ; 

router.post("/updatePassword" , authMiddleware , updatePasswordController )

router.post("/resetPassword" , authMiddleware )

router.post("/deleteUser/:id" , authMiddleware )




module.exports = router ; 