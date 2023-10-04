const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the name"]
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please create password"]
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);