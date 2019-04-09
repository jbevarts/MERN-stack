// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is data base's data structure
const DataSchema = new Schema(
    {
        id: Number,
        message: String
    }, 
    { timestamps: true }
);

//this is the first form's data structure

const FormDataSchema = new Schema(
    {
        id: Number,
        name: String,
        age: Number,
        gender: String,
        skills: Array, // maybe change this
        about: String
    },
    { timestamps: true }
);


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
module.exports = mongoose.model("Form", FormDataSchema);

