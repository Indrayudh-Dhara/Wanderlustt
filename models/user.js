const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   email : { // only email cuz passport local mongoose will add username and passsword by default
        type : String,
        required: true,
   }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User" , userSchema);