// backend/user.js

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema (
    {
        email: String,
        password: String,
        data: [],
        formStyles: [],
        forms: [],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
