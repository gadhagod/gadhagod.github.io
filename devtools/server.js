const express = require("express")
const path = require("path")
const cors = require("cors");

const app = express();
app.use(cors());


app.get("/", (req, res) => {
    res.sendFile("timestamp.txt", { root: "build" });
})

module.exports = async () => app.listen(3000);