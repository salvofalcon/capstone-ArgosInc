"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User.ts
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    height: { type: Number, required: false },
    weight: { type: Number, required: false }
});
var User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
