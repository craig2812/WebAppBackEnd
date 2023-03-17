const express = require( "express");
const {connectToDatabase}  =require("./services/database.service");
const contentRouter =require("./routes/content.router");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
import {json} from 'body-parser'
const mongoose =require('mongoose')
const { connectDB } =require("./config/db")

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        // send all calls to /games to our gamesRouter
        console.log(`attempting connection at http://localhost:${port}`);

        app.use("/", contentRouter);

        // start the Express server
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: any) => {
        console.error("Database connection failed", error);
        process.exit();
    });


    require('dotenv').config({path:'./config.env'});


    
    
    
    // const app= express();
    // const PORT= process.env.PORT || 8000;
    // const errorHandler = require('./middleware/error')
    
    // //connect to db
    // connectDB()
    
    // app.use(express.json());
    // app.use("/api/auth", require("./routes/auth"));
    // app.use("/api/private", require("./routes/private"));
    
    // //ErrorHandler (Should be last piece of middleware)
    // app.use(errorHandler);
    
    // const server=app.listen(
    //     PORT,()=>{
    //         console.log(`Server is running on port ${PORT}`)
    //     }
    // )
    // process.on("unhandledRejection",(error,promise)=>{
    //     console.log(`Logged Error: ${error}`);
    //     server.close(()=>process.exit(1))
    
    // })