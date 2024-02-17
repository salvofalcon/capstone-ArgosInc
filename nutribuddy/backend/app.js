const express = require('express');
const cors = require('cors');
const moongoose = require('mongoose');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

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
});

app.post("/login-user", async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.send({error: "Account not found, please try again."});
    }
    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({email: user.email}, JWT_SECRET);

        if(res.status(201)) {
            return res.json({ status: "OK", data: token});
        } else {
            return res.json({ error: "error"});
        }
    }
    res.json({status: "error", error: "Invalid password, please try again."})
});

app.post("/userData", async(req, res) => {
    const {token} = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;
        User.findOne({email: useremail})
            .then((data) => {
                res.send({status: "OK", data: data});
            })
            .catch((error) => {
                res.send({status: "error", data: error});
            })
    } catch(error) {
        res.send({status: "ERROR"})
    }
});

app.listen(5000, () => {
    console.log("Server started.")
});
