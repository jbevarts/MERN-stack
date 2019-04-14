const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersLoggedInSchema = new Schema (
    loggedIpAddresses: []
);

module.exports = mongoose.model("Loggedin", UsersLoggedInSchema);
