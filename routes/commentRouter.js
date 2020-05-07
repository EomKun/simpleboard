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
    dbo.collection("comment").deleteOne(myquery, function(err, result) {
        if (err) {
            console.log(err);
            res.json({ msg: false });
        } else {
            res.json({ msg: true });
        }
    });
});

/* router.post("/add", (req, res) => {
    dbo.collection('comment').aggregate([
        { 
            $lookup : {
                from: "member",
                localField: "commenter",
                foreignField: "_id",
                as: "comment_user",
            }
        }
    ]).toArray((err, result) => {
        if(err) {
            console.log(err);
            res.json({ msg: false });
        } else {
            res.json({ msg: result });
        }
    });
}); */

router.post("/add", (req, res) => {
    try {
        const objId = mongo.ObjectId(req.body._id);
    } catch (err) {
        res.json({ msg: false, text: "그런 회원 없습니다" });  
    }

    const query = { _id: mongo.ObjectId(req.body._id) };
    dbo.collection("member").findOne(query, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ msg: false });
        } else {
            console.log(result);
            if(result) {
                dbo.collection("comment").save({ 
                    commenter : mongo.ObjectId(req.body._id), 
                    comment: req.body.comment,
                }, (err, sub_result) => {
                    if (err) {
                        console.log(err)
                        res.json({ msg: false });
                    } else {
                        if(sub_result) {
                            res.json({ msg: sub_result.toString() });
                        }   
                    }
                });
            } else {
                res.json({ msg: "그런 회원 없습니다" });  
            }
        }
    });
});


router.post("/", (req, res) => {
    dbo.collection('comment').aggregate([
        { 
            $lookup : {
                from: "member",
                localField: "commenter",
                foreignField: "_id",
                as: "comment_user",
            }
        }
    ]).toArray((err, result) => {
        if(err) {
            console.log(err);
            res.json({ msg: false });
        } else {
            res.json({ msg: result });
        }
    });
    /* dbo.collection("comment").find({}).toArray(function(err, result) {
        if (err) {
            console.log(err)
            res.json({ msg: false });
        } else {
            res.json({ msg: result });   
        }
    }); */
});

module.exports = router;