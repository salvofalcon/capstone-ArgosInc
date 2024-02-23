const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => {
    console.log("Mongodb connected.");
})
.catch(() => {
    console.log("Failed to connect to MongoDB.")
})

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

const collection = mongoose.model("collection", newSchema);

module.exports = collection
