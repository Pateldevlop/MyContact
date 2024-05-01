const mongoose = require('mongoose'); 
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the Username."]
    },
    email: {
        type: String,
        required: [true, "Please add the Email Id."],
        unique: [true, "Email address is already exist."]
    },
    password: {
        type: String,
        required: [true, "Please add the Password."]
    },
},{
    timestamps : true
});


module.exports = mongoose.model("User", userSchema);