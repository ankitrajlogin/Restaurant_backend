
const jwt = require("jsonwebtoken") ;
const dotenv = require('dotenv') ;


dotenv.config() ;

// function to generate JWT token
// jwt.sign(payload, secretKey, options)
// The payload must be an object, like { userId }.

const generateToken = (userId) =>{
    

    return jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn: "7d" ,  // Token expires in 7 days
    })
}



// How jwt.verify() Works?
// jwt.verify(token, secretKey):
// Decodes the JWT: Extracts the payload (user data).
// Validates Signature: Ensures the token was signed using the correct secret.
// Checks Expiry (exp): If expired, throws an error.
// If Valid, Returns the Payload (User ID, email, etc.).



const verifyToken = (token) => {

   return new Promise((resolve , reject) => {
    jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
        if(err){
            return reject({
                success : false , 
                message : "Invalid or expired token" , 
                error : err 
            }) ; 
        }
        else{
            return resolve(decoded) ; 
        }
    })
   })
};



module.exports = {generateToken , verifyToken} ; 