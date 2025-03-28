const restaurant = require("../models/restaurantModel");


const createRestaurantController = async (req , res) => {

    try{
        const{
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

        // Basic Validation
        if (!title) {
            return res.status(400).json({ error: "Restaurant Title is required" });
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
        const newRestaurant = new restaurant({
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
            message : "Error iIn create Resturant api" , 
            error 
        })
    }

};


module.exports = {createRestaurantController} ; 