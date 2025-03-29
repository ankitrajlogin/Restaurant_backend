const restaurantModel = require("../models/restaurantModel");


const createRestaurantController = async (req , res) => {

    try{
        const{
            restaurantId , 
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        } = req.body;

        console.log("restaurantId " , restaurantId) ; 

        if(!restaurantId){
            return res.status(400).json({
                success : false ,     
                error: "Restaurant UniqueId is required" 
            });

        }

        const findrestaurant = await restaurantModel.findOne({ restaurantId });


        console.log(findrestaurant) ; 

        if(findrestaurant){
            return res.status(400).json({
                success : false , 
                error : "Please Provide Unique restaurant ID"
            })
        }

        // Basic Validation
        if (!title) {
            return res.status(400).json({
                success : false ,     
                error: "Restaurant Title is required" 
            });
        }

        // Validate Coordinates
        if (!coords || !coords.latitute || !coords.longitude || !coords.address) {
            return res.status(400).json({ error: "Invalid or missing coordinates" });
        }

        // Ensure rating is within range
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        // Create new restaurant instance
        const newRestaurant = new restaurantModel({
            restaurantId , 
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });

        // Save to database
        const savedRestaurant = await newRestaurant.save();
        
        // Respond with success message
        res.status(201).json({
            message: "Restaurant created successfully",
            restaurant: savedRestaurant
        });




    }
    catch(error){
        console.log(error) ; 
        res.status(500).send({
            success : false , 
            message : "Error In create Resturant api" , 
            error 
        })
    }

};


// get all restaurant 

const getAllRestaurantController = async (req , res) => {
    try {
        const restaurants = await restaurantModel.find() ; 

        if(!restaurants){
            res.status(404).send({
                sucess : false , 
                message : "No Restaurant Available"
            })
        }

        res.status(200).send({
            success : true , 
            totalCount : restaurants.length , 
            restaurants
        })


    }
    catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({
            success: false,
            message: "Server error, unable to fetch restaurants."
        });
    }
    
}; 


const getResaurantByIdController = async (req , res) => {
    try{

        const restaurantId = req.params.id ; 

        if(!restaurantId){
            return res.status(404).send({
                success : false , 
                message : "Please Provide Resturant ID" 
            }) ; 
        }

        const restaurant = await restaurantModel.findOne({ restaurantId });
 

        if(!restaurant){
            return res.status(404).send({
                success : false , 
                message : "Not Find the resturant with this ID"
            })
        }

        res.status(200).send({
            success : true , 
            restaurant 
        })

    }   
    catch(error){

    } 
}


module.exports = {createRestaurantController , getAllRestaurantController , getResaurantByIdController} ; 