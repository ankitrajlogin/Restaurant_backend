
const mongoose = require(`mongoose`) 


// schema 

const userSchema = new mongoose.Schema({
    userName:{
        type:String , 
        required:[true, 'user name is required']
    }, 
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique : true 
    }, 
    password : {
        type : String , 
        required : [true , 'password is required']
    },
    address:{
        type : Array , 
    }, 
    phone:{
        type : String , 
        required : [true , 'phone number is require']
    },
    usertype:{
        type : String , 
        required : [true , 'user type is required'],
        default : 'clinet' ,
        enum:['clinet', 'admin' , 'vendor' , 'driver']
    },
    security: {
        question: { 
            type: String, 
            required: [true , 'Question is required'],
        },
        answer: { 
            type: String, 
            required: [true , 'Answer is Required' ]
         } // Ideally, store this hashed
    },
    profile:{
        type : String , 
        default: "Image link"
    }
} , 
{timestamps: true})


module.exports = mongoose.model('User' , userSchema)