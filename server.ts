const express = require( "express");
const {connectToDatabase}  =require("./services/database.service");
const contentRouter =require("./routes/content.router");
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


    require('dotenv').config({path:'./.env'});