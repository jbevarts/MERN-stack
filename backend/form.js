// /backend/form.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this is the first form's data structure

const FormDataSchema = new Schema(
    {
        ownerid: String,
        type: String,
        metrics: [] // value, type
    },
    { timestamps: true }
);


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Form", FormDataSchema);
