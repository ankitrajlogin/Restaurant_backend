
const express = require("express") ; 
const {verifyToken} = require("../utils/jwtUtils")  ;
const dotenv = require('dotenv') ;
const JWT = require('jsonwebtoken') ; 

dotenv.config() ;

const authMiddleware = async (req , res , next) =>{
    try {
        const authHeader = req.headers["authorization"] ; 

        console.log("authheader is : " , authHeader) ; 

        console.log("testing 1") ; 
        
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success : false , 
                message : "Unauthorized: No token provided 1"  , 
            }); 
        }
        console.log("testing 2") ; 
        
        const token = authHeader.split(" ")[1] ; 
        console.log("testing 3") ; 
        
        if(!token){
            return res.status(401).json({
                success : false , 
                message : "Unauthorized : Invalid token format 2" , 
            })
        }
        const decoded2 = await verifyToken(token) ; 
        console.log("testing 4") ; 

        console.log(decoded2) ; 
        
        // Verify the JWT token
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: Invalid token",
                });
            }

            // Attach decoded user ID to request body
            req.body.userId = decoded.id;

            console.log("decoded value : " , req.body) ;
            next(); // Proceed to the next middleware
        });
        
        
        // if (!decoded || !decoded.id) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Unauthorized: Invalid token 3",
        //     });
        // }


        // req.body.id = decoded.id ; // attack decoded user ID to request ; 

        
    }
    catch(error){
        console.log("Error in Auth Middleware: " , error) ; 

        res.status(500).json({
            success : false , 
            message : "Error in Auth API , middleware" , 
            error 
        });
    }
}


module.exports = authMiddleware ; 
