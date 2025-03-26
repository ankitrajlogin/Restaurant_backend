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


        const {_id , password , ...userWithoutId} = user.toObject() ; 

        res.status(200).send({
            success : true , 
            message : "Password Updated !" , userWithoutId
 
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
    try{
        const {email , securityQuestion , securityAnswer , newPassword } = req.body ; 
        
        if(!email ||  !securityQuestion || !securityAnswer || !newPassword){
            return res.status(404).send({
                success : false , 
                message : "Provide all field properly" 
            }) ; 
        }

        const user = await userModel.findOne({email}) ; 

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        if(user.security.question !== securityQuestion){
            return res.status(400).send({
                success: false,
                message: "Security question does not match",
            });
        }

        const isAnswerCorrect = await bcrypt.compare(securityAnswer, user.security.answer);
        if (!isAnswerCorrect) {
            return res.status(400).send({
                success: false,
                message: "Security answer is incorrect.",
            });
        }

        const hashedPassword = await hashPassword(newPassword) ; 

        user.password = hashPassword ; 

        await user.save() ;
        
        const {password , _id , security , ...user_withouID} = user.toObject() ; 

        res.status(200).send({
            success: true,
            message: "Password has been reset successfully!",
            user_withouID
        })


    }
    catch(err){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Reset Password API",
            error,
        });
    }
};




module.exports = {
    getUserController , 
    updateUserController,
    updatePasswordController,
    resetPasswordController
    } ; 