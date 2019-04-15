const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const Form = require("./form");
const User = require("./user");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is my mongoDB database
const dbRoute = "mongodb+srv://jerbDatabase:jerb@cluster0-wgdrr.mongodb.net/test?retryWrites=true";

//connects my back end code with the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);
let db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.once("open", () => console.log("connected to the database"));

// checks if connection with database was successful
db.on("error", console.error.bind(console, "MongoDB Connection Error"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is the get method
// this method fetches all available data in our database
// the .find() function could take a parameter that selects by parameter, however I believe without a parameter it selects all


// I believe the second parameter, data, is an assumed return parameter for the passed in "closure" more or less.

// TODO: I could add a get method that selects by form type or something...

router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({success: false, error: err });
        return res.json({success: true, data: data});
    });
});

router.get("/getFormData", (req, res) => {
    Form.find((err, data) => {
        if (err) return res.json({success: false, error: err });
        return res.json({success: true, data: data});
    });
});


router.get("/getUser", (req, res) => {
    User.find((err, data) => {
        if (err) return res.json({success: false, error: err });
        return res.json({success: true, data: data});
    });
});





// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
     
    Data.findByIdAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this method is for deleting forms
router.delete("/deleteForm", (req, res) => {
    const { id } = req.body;
    Form.findByIdAndRemove(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});


// this is our create method
// // this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();

    const {type, id, message } = req.body;
    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.type = type;
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/putForm", (req, res) => {
    let form = new Form();
    const {ownerid, type, id, name, age, gender, salary, skills, about} = req.body;
    // TODO: add some input sanitization similar to above in putData
    form.ownerid = ownerid;
    form.type = type;
    form.id = id;
    form.name = name;
    form.age = age;
    form.gender = gender;
    form.salary = salary;
    form.skills = skills;
    form.about = about;
    form.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/putUser", (req, res) => {
    let user = new User();
    
    const { email, password } = req.body;
    user.email = email;
    user.password = password;
    user.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ sucess: true });
    });
});

// append /api for http requests
app.use("/api", router);

// launch backend into a port
app.listen(API_PORT, () => console.log("LISTENING ON PORT ${API_PORT}"));
