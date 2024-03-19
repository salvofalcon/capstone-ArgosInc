const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        email: {type: String, unique: true},
        password: String,

        // Functional Information
        height: Number,
        weight: Number,
        age: Number,
        sex: String,
        bmr: Number,
        activityLevel: String,
        goal: String,
        userCalorieGoal: String,
    },
    {
        collection: "UserInfo"
    }
);

mongoose.model("UserInfo", UserDetailsSchema);
