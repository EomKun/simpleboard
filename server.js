const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/member", require("./routes/memberRouter"));

app.listen(8080, () => {
    console.log("Server Ready");
});