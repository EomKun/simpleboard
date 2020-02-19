const express = require("express");
const mongo = require("mongodb");
const router = express.Router();
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/nodejs";

router.post("/", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err)
            res.json({ msg: false });
        } else {
            const dbo = db.db("nodejs");
            dbo.collection("member").find({}).toArray(function(err, result) {
                if (err) {
                    console.log(err)
                    res.json({ msg: false });
                } else {
                    db.close(); 
                    res.json({ msg: result });   
                }
            });
        }
    });
});

module.exports = router;