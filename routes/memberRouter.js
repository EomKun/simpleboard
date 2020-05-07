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

router.post("/delete", (req, res) => {
    const myquery = { _id: mongo.ObjectId(req.body._id) };
    dbo.collection("member").deleteOne(myquery, function(err, result) {
        if (err) {
            console.log(err);
            res.json({ msg: false });
        } else {
            res.json({ msg: true });
        }
    });
});

router.post("/update", (req, res) => {
    const myquery = { _id: mongo.ObjectId(req.body._id) };
    const newvalues = { $set: { name: req.body.name, age: req.body.age, married:req.body.married } };
    dbo.collection("member").updateOne(myquery, newvalues, function(err, result) {
        if (err) {
            console.log(err);
            res.json({ msg: false });
        } else {
            res.json({ msg: true });
        }
    });
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
                console.log(result);
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