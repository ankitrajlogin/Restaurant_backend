const mongoose = require("mongoose") ; 

const restaurantSchema = new mongoose.Schema({
    restaurantId: {
        type: String,
        required : true , 
        unique: true,
        },
    title:{
        type : String , 
        required : [true , "Resurant Title is required"]
    },
    imageUrl : {
        type : String , 
    },
    foods : [
        {
            name : {
                type : String , 
                required : [true , "Food name is required" ]
            }, 
            picUrl : {
                type : String 
            },
            price : {
                type : Number , 
                required : [true , "Food price is required"] , 
                min : [ 1 , "Price must be a positive number"]
            }
        }
    ],
    time : {
        type : String 
    },
    pickup : {
        type : Boolean , 
        default : true 
    },
    delivery : {
        type : Boolean , 
        default : true 
    },
    isOpen : {
        type : Boolean , 
        default : true 

    }, 
    logoUrl : {
        type : String 
    },
    rating : {
        type : Number , 
        default : 1 , 
        min : 1 , 
        max : 5 
    }, 
    ratingCount : {
        type : String
    },
    code : {
        type : String , 
    },
    coords : {
        id : {
            type: String
        } , 
        latitute : {
            type : Number
        },
        latitudeDelta : {
            type : Number
        },
        longitude : {
            type : Number
        },
        longitudeDelta : {
            type : Number
        },
        address : {
            type : String
        },
        title : {
            type : String
        }

    }
},
{timestamps : true})


module.exports = mongoose.model("Restaurant" , restaurantSchema) ; 



