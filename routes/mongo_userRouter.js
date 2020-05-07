const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

router.post("/delete", async (req, res) => {
    try {
        const result = await User.remove({ _id: req.body._id });
        res.json({ users });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

router.post("/update", async (req, res) => {
    try {
        const result = await User.update(
            { _id: req.body._id }, 
            { name: req.body.name, age: req.body.age, married: req.body.married }
        );

        res.json({ result });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

router.post("/add", async (req, res) => {
    try {
        // 클래스 (model)을 생성해서 직접 값을 넣은 후 클래스의 save를 호출함
        const user = new User(req.body);
        const result = await user.save();
        res.json({ result });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

router.post("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ msg: users });
    } catch (err) {
        console.log(err);
        res.json({ msg: false });
    }
});

module.exports = router;