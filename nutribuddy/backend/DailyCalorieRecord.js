const mongoose = require("mongoose");

const DailyCalorieRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  caloriesConsumed: {
    type: Number,
    required: true,
    default: 0,
  },
  caloriesRemaining: {
    type: Number,
  },
});

DailyCalorieRecordSchema.index({ userId: 1, date: 1 }, { unique: true });

mongoose.model("DailyCalorieRecord", DailyCalorieRecordSchema);
