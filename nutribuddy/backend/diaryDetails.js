const mongoose = require("mongoose");

const FoodDiarySchema = new mongoose.Schema(
    {
        email: {type: String, unique: true},

        // Functional Information
        entries: [
            {
                foodName: String,
                quantity: Number,
                mealType: String,
                date: Date,
                calories: Number,
                carbs: Number,
                fat: Number,
                protein: Number,
            }
        ]
    },
    {
        collection: "DiaryInfo"
    }
);

mongoose.model("DiaryInfo", FoodDiarySchema);
