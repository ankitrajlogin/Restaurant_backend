
const express = require("express") ; 
const {getUserController , updateUserController , updatePasswordController , resetPasswordController , deleteUserController} = require("../controllers/userControllers");
const {authMiddleware } = require("../middlewares/authMiddleware")

const router = express.Router() ; 


router.get('/getUser' , authMiddleware ,  getUserController)  ; 

router.post('/updateUser' , authMiddleware , updateUserController) ; 

router.post("/updatePassword" , authMiddleware , updatePasswordController )

router.post("/resetPassword" , authMiddleware , resetPasswordController)

router.delete("/deleteUser/:email" , authMiddleware , deleteUserController )




module.exports = router ; 