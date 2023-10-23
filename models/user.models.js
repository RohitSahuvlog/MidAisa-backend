const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    checkotp: {
        type: Boolean,
        default: true
    },
    create_at: {
        type: Date,
        default: new Date(),
    }
});

const User = mongoose.model("AdminUser", userSchema);
module.exports = User;
