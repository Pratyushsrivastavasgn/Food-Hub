const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const path = require("path"); 
const mov= require("method-override")

async function mongo_connect() {
    try {
        await mongoose.connect('mongodb+srv://user1:pass1@cluster1.ddwffa4.mongodb.net/pratyush_foodhub');
        console.log("Successfully connected to the server");
    } catch (err) {
        console.error("Connection error go find yourself which one");
    }
}
mongo_connect();

const app = express();

app.use(express.static("public"));
app.use("/foodposts", router);
app.use(mov("_method"))
app.use('/uploads', express.static('uploads'))


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.sendFile("C:\\Users\\intel\\OneDrive\\Desktop\\ongoing projects\\Food-Hub-CN\\templates\\home.html");
});

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = "something is wrong";
//     res.status(statusCode).send("Error:", err);
// });

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
