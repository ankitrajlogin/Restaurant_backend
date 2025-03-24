const userModel = require("../models/userModel") ; 
const bcrypt = require("bcryptjs") ; 
const hashPassword = require("../utils/hashPassword") ; 
const JWT = require("jsonwebtoken") ; 


const registerController = async (req , res) => {
    try{
        // destructuring .
        const {userName , email , password , phone , address} = req.body 

        // validation 

        if(!userName || !email || !password || !address || !phone){
            return res.status(500).send({
                success : false , 
                message : 'Please Provide All Fields' 
            })
        }

        // Check user 

        const existing = await userModel.findOne({email})

        if(existing){
            return res.status(500).send({
                success : false , 
                message : 'Email Already Registered please login'
            })
        }
        
        // hashing password 
        const hashedPassword = await hashPassword(password) ; 

        // create new user 

        const user = await userModel.create({
            userName, 
            email, 
            password : hashedPassword , 
            address, 
            phone 
        });

        res.status(201).send({
            success : true , 
            message : "Successfully Registered" , 
            user
        });
    }
    catch(error){
        console.log(error) 
        res.status(500).send({
            success : false , 
            message : "Error In Register API" , 
            error 
        })
    }
}; 


const loginController = async (req , res) => {
    try{
        const {email , password} = req.body 

        // validation 
        if(!email || !password){
            return res.status(500).send({
                success : false , 
                message : 'Please Provide Email And Password Properly'
            })
        }

        // check user 
        const user = await userModel.findOne({email}) ; 
        
        if(!user){
            return res.status(404).send({
                success : false , 
                message : "Not Registered Email. Registered First" 
            }); 
        }

        // check user password | compare password 
        const isMatch = await bcrypt.compare(password , user.password )

        if(!isMatch){
            return res.status(500).send({
                success : false , 
                message : "User Not Found OR Password Mismatch"
            }) ; 
        }

        
       

        const token = JWT.sign({id:user._id} , process.env.JWT_SECRET , {
            expiresIn: '7d'  
        }) ;

        user.password = undefined ; 

        res.status(200).send({
            success : true , 
            message : "Login Sucessfully" , 
            token , 
            user 
        })

    }
    catch(error){
        console.log(error) 
        res.status(500).send({
            success : false , 
            message : "Error In Register API" , 
            error 
        })
    }
};

module.exports = {registerController, loginController} ;