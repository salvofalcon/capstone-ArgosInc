const express = require('express');
const cors = require('cors');
const moongoose = require('mongoose');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => {
    console.log("Connected to MongoDB.");
})
.catch(e => console.log("ERROR: Could not connect to MongoDB."))

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async(req, res) => {
    const {fname, lname, password, email} = req.body

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({ email });

        if(oldUser) {
            return res.send({error: "Email already exists, please log in."})
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        });
        res.send({status: "OK"})
    } catch(error) {
        res.send({status: "ERROR"})
    }
})

app.listen(5000, () => {
    console.log("Server started.")
});
