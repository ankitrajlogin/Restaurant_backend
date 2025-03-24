
const dotenv = require('dotenv') ;
const bcrypt = require("bcryptjs") ; 



const hashPassword = async (password) => {
    dotenv.config() ; 
    
    try {
        // Generate a salt
        const saltRounds =  Number(process.env.SALTROUND) || 5; 
        
        
        console.log("saltRound is :" , saltRounds) ;

        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
};

module.exports = hashPassword;