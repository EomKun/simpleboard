const express = require("express");
const path = require("path");
const app = express();
const connect = require("./schemas");

connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/member", require("./routes/memberRouter"));
// app.use("/member", require("./routes/mongo_userRouter"));
app.use("/comment", require("./routes/commentRouter"));

app.listen(8080, () => {
    console.log("Server Ready");
});