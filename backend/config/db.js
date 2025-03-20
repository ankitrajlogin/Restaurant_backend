
const mongoose = require("mongoose")  ; 
const colors = require("colors") ; 


const connectDb = async () => {
    try{
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is not defined in environment variables!".bgRed.white);
            return;
        } else {
            console.log("MONGO_URL is correctly set.".white);
        }

        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To database ${mongoose.connection.host}`.bgWhite)
    }
    catch(error){
        console.log(`DB Error ${error}`) ; 
    }
}; 


module.exports = connectDb ; 
