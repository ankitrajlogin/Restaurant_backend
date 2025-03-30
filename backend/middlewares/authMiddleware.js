
const express = require("express") ; 
const {verifyToken} = require("../utils/jwtUtils")  ;
const dotenv = require('dotenv') ;
const JWT = require('jsonwebtoken') ; 

dotenv.config() ;

const authMiddleware = async (req , res , next) =>{

    console.log("testing 1")
    try {
        console.log(req) ; 
        const authHeader = req.headers["authorization"] ; 
        console.log("authheader is : " , authHeader) ; 

        console.log("testing 12")
        
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success : false , 
                message : "Unauthorized: No token provided 1"  , 
            }); 
        }
        
        const token = authHeader.split(" ")[1] ; 
        
        if(!token){
            return res.status(401).json({
                success : false , 
                message : "Unauthorized : Invalid token format 2" , 
            })
        }

        const decoded = await verifyToken(token) ; 
        console.log(decoded) ;
        
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token , signup",
            });
        }

        req.body.id = decoded.id ; // attack decoded user ID to request ; 

        console.log("testing 13")
        next() ; 


        // JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        //     if (err) {
        //         return res.status(401).json({
        //             success: false,
        //             message: "Unauthorized: Invalid token",
        //         });
        //     }

        //     // Attach decoded user ID to request body
        //     req.body.userId = decoded.id;
        //     next(); // Proceed to the next middleware
        // });

    }
    catch(error){
        console.log("Error in Auth Middleware: " , error) ; 

        res.status(500).json({
            success : false , 
            message : "Auth Token is not provided" , 
            error 
        });
    }
}


const adminMiddleware =  (req , res , next) => {
    if(req.role !== "admin"){
        return res.status(403).json({
            success : false , 
            message : "Access Denied ! "
        })

    }

    next() ; 
}

module.exports = {authMiddleware , adminMiddleware } ; 
