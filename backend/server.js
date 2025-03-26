const express = require('express')  ; 
const colors = require('colors');
const cors = require("cors") ;
const morgan = require("morgan") ; 
const dotenv = require('dotenv') ;
const connectDb = require("./config/db")

// dot env variable 
dotenv.config() ;  // for root , not need to specify path. 




// DB connection 
//     connectDb() ; 



// rest object 
const app = express() 



// middleware 
app.use(cors()) ; 
app.use(express.json()) ;
app.use(morgan("dev")) ;


// route 

app.use('/api/v1/test' , require("./routes/testRoutes")) ; 
app.use('/api/v1/auth' , require("./routes/authRoutes")) ; 
app.use('/api/v1/user' , require('./routes/userRoutes')) ;


// route 

// url => http :// 
app.get('/test' , (req , res) => {
    return res.status(200).send(
        "<h1>Welcome to food server testing , API Based Project</h1>"
    ); 
} )

// PORT 
const PORT = process.env.PORT || 5000 ; 

// listen 
// app.listen(PORT , () => {
//     console.log(`Server running on ${PORT}`.white.bgMagenta)

// })


// Connect to the database, then start the server
connectDb().then(() => {
    console.log("message 1")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`.white.bgMagenta);
    });
}).catch((error) => {
    console.error(`Failed to start server due to DB error: ${error.message}`.bgRed.white);
});