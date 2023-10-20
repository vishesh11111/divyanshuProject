const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    // adress: { type: String },
    // PinCode: { type: String },
    contact: { type: String },
    email: { type: String },
    password: { type: String }
});

module.exports = mongoose.model("user", UserSchema);