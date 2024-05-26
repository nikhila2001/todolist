const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

// user model
const UserSchema = new mongoose.Schema({
    username: {
        type:"String",
        required:true,
    },
    email: {
        type: "String",
        required:true,
        unique: true
    },
    password: {
        type: "String",
        required:true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
      },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;