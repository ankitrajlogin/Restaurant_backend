// GET USER INFO 
const userModel = require("../models/userModel") ;

const bcrypt = require("bcryptjs") ; 
const hashPassword = require("../utils/hashPassword") ; 


const getUserController = async (req , res) => {
    // res.status(200).send("User Data") ; 
    console.log(req.body) ;  

    try{
        // find user 
        const user = await userModel.findById({_id : req.body.id} , {_id : 0})
        // we can hide id use this. 

        // validator 

        if(!user){
            return res.status(404).send({
                success : false , 
                message : "user not found" 
            })
        }

        // hide password 
        // user.password = undefined ; 

        // need to do toObject so that security directly access. 
        const {password , _id , security , ...user_withouID} = user.toObject() ; 

        res.status(200).send({
            success : true , 
            user_withouID 
        })
    }
    catch(error){
        console.log(error) ; 
        res.status(500).send({
            success : false , 
            messsage : "Error in Get User API" , 
            error 
        })
    }


} ;

const updateUserController = async(req , res) => {
    console.log(req) ; 
    try{
        const user = await userModel.findById({_id : req.body.id}) ; 

        console.log("1")
        if(!user){
            return res.status(404).send(
                {
                    success : false , 
                    message : "User not found" 
                }
            )
        }

        const {userName , address , phone , security:securityData  } = req.body ; 

        if(userName) user.userName = userName 
        if(address) user.address = address 
        if(phone) user.phone = phone 

        if(securityData  && securityData ?.question && securityData ?.answer){
            // We ensure that even if security is missing in the database, an empty object {} is assigned to user.security. Now, we can safely update both question and answer:
            user.security = user.security || {};
            user.security.question = securityData.question ;
            
            const hashedAnswer = await hashPassword(securityData .answer) ; 
            user.security.answer = hashedAnswer ; 
        }

        // user.name = "ankit" ; 
//         The new field (name) is added to the user object in memory.
// However, since name is not defined in the Mongoose schema, it is not saved to the database.
// Mongoose doesn't throw an error because it only validates fields present in the schema when you attempt to save.

        await user.save() 

        const {password , _id , security , ...user_withouID} = user.toObject() ; 
        

        res.status(200).send({
            success : true , 
            message : "User Updated successfully" , 
            user_withouID
        })

    }
    catch(error){
        console.log(error) ; 
        res.status(500).send({
            success : false , 
            messsage : "Error in Update User API" , 
            error 
        })
    }

}

const updatePasswordController = async(req , res) => {
    try{
        const user = await userModel.findById({_id : req.body.id}) ;
        
        // validation 
        if(!user){
            return res.status(404).send({
                success : false , 
                message : "User not found" 
            })
        }

        // get data from user 

        const {oldPassword , newPassword} = req.body 

        if(!oldPassword || ! newPassword){
            return res.status(500).send({
                success : false , 
                message : "Please Provide Old and New Password Both"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword , user.password) ; 

        if(!isMatch){
            return res.status(500).send({
                success : false , 
                message : "Old password is not correct" , 
            }); 
        }

        // password is matched, so now , hashing new password 

        const hashedPassword = await hashPassword(newPassword) ; 

        user.password = hashedPassword ; 
        
        // Improvement 
        // Nested try-catch block → Ensures user.save() failures are caught separately

        await user.save() ;
        
        // user.password = undefined ;
        
        // //MongoDB ignores changes to _id, so even if you set it to undefined, it remains unchanged
        // user.id = undefined ; 


        const {_id , password , security ,  ...userWithoutId} = user.toObject() ; 

        res.status(200).send({
            success : true , 
            message : "Password Updated !" , 
            userWithoutId
 
        })

    }
    catch(error){
        console.log(error) ; 
        res.status(500).send({
            success : false , 
            messsage : "Error in Updaete User API" , 
            error 
        })
    }

};



// front end manage the security question select of enum when there is login. 
// and hence. during the resetPassword , user have to select the correct question and then answer it accordingly to reset their password. 

const resetPasswordController = async(req , res) =>{
    console.log("message 5")
    try{
        const { email, security : sec , newPassword } = req.body;

        if (!email || !sec || !sec.question || !sec.answer || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Provide all fields properly.",
            });
        }

        console.log("message 51")

        const user = await userModel.findOne({email}) ; 

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        console.log("message 53")

        if(user.security.question !== sec.question){
            return res.status(400).send({
                success: false,
                message: "Security question does not match",
            });
        }

        const isAnswerCorrect = await bcrypt.compare(sec.answer, user.security.answer);

        if (!isAnswerCorrect) {
            return res.status(400).send({
                success: false,
                message: "Security answer is incorrect.",
            });
        }

        const isMatch = await bcrypt.compare(newPassword , user.password ) ; 

        if(isMatch){
            return res.status(400).send({
                success: false,
                message: "Old and New Password are same, Try different"
            })
        }


        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;

        await user.save();

        const { password, _id, security , ...userWithoutSensitiveData } = user.toObject();
 

        res.status(200).send({
            success: true,
            message: "Password has been reset successfully!",
            userWithoutSensitiveData
        })


    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Reset Password API",
            error,
        });
    }
};




const deleteUserController = async (req, res) => {
    console.log("message 6")
    try {
        const { email } = req.params;

        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: "Email is required!" 
            });
        }

        // Find and delete the user
        const deletedUser = await userModel.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found!" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "User deleted successfully!" });
    } 
    catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error deleting user", error 
        });
    }
};


module.exports = {
    getUserController , 
    updateUserController,
    updatePasswordController,
    resetPasswordController , 
    deleteUserController
    } ; 