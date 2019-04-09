// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is data base's data structure
const DataSchema = new Schema(
    {
        type: String,
        id: Number,
        message: String
    }, 
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
// This is also the constructor for the model, wrapping our schema and creating an instance of a document:
module.exports = mongoose.model("Data", DataSchema);

