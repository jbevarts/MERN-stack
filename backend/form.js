// /backend/form.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this is the first form's data structure

const FormDataSchema = new Schema(
    {
        type: String,
        id: Number,
        name: String,
        age: Number,
        gender: String,
        salary: Number,
        skills: [String], // maybe change this
        about: String
    },
    { timestamps: true }
);


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Form", FormDataSchema);
