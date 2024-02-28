const express = require('express');
const cors = require('cors');
const moongoose = require('mongoose');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const bcrypt = require("bcryptjs");
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

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
        const token = jwt.sign({email: user.email}, JWT_SECRET,{
            expiresIn: 57600,
        });

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
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if(err) {
                return "token expired";
            }
            return res;
        });
        console.log(user)
        if(user == "token expired") {
            return res.send({status: "error", data: "token expired"});
        }

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

app.post("/forgot-password", async(req, res) => {
    const {email} = req.body;
    try {
        const oldUser = await User.findOne({email});
        if(!oldUser) {
            return res.json({status:"User email does not exist"});
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: '5m'});
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'buddynutri@gmail.com',
              pass: process.env.EMAIL_PASSWORD 
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Reset your Nutribuddy password',
            text: link
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        console.log(link);
    } catch(error) {
        res.send({status: "error", data: error});
    }
});

app.get("/reset-password/:id/:token", async(req, res) => {
    const {id, token} = req.params;
    console.log(req.params);

    const oldUser = await User.findOne({_id:id});
    if(!oldUser) {
        return res.json({status:"User does not exist"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", {email:verify.email, status: "Not Verified"});
    } catch(error) {
        res.send("Not Verified");
    }
});

app.post("/reset-password/:id/:token", async(req, res) => {
    const {id, token} = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({_id:id});
    if(!oldUser) {
        return res.json({status:"User does not exist"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({
            _id:id,
        },
        {
            $set: {
                password: encryptedPassword,
            },
        });
        //res.json({status: "Password Updated"});
        res.render("index", {email:verify.email, status:"verified"});
    } catch(error) {
        console.log(error);
        res.send("Something Went Wrong");
    }
});

app.post("/search-food", async (req, res) => {
    try {
        const { query } = req.body;
        const apiKey = process.env.CK_API_KEY;
        const password = "";
        const response = await axios.get(`https://foodapi.calorieking.com/v1/foods?region=us&query=${query}&fields=$summary,nutrients`, {
            headers: {
                Authorization: "Basic " + Buffer.from(apiKey + ":" + password).toString('base64'),
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                'x-rapidapi-key': process.env.CK_API_KEY,
            }
        });
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error("Error searching for food:", error);
        res.status(500).send("Error searching for food");
    }
});

app.listen(5000, () => {
    console.log("Server started.")
});
