const express = require("express");
const mongo = require("mongodb");
const router = express.Router();
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/nodejs";
let dbo;

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log(err)
        res.json({ msg: false });
    } else {
        dbo = db.db("nodejs");
    }
});

router.post("/add", (req, res) => {
    dbo.collection("member").save({ 
        name: req.body.name, 
        age: req.body.age,
        married: req.body.married
    }, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ msg: false });
        } else {
            if(result) {
                res.json({ msg: result });
            }   
        }
    });
});

router.post("/", (req, res) => {
    dbo.collection("member").find({}).toArray(function(err, result) {
        if (err) {
            console.log(err)
            res.json({ msg: false });
        } else {
            res.json({ msg: result });   
        }
    });
});

module.exports = router;