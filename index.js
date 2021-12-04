"use strict";
exports.__esModule = true;
var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static("dist"));
app.get('/env', function (req, res) {
    res.send({
        enviromtent: process.env.NODE_ENV
    });
});
app.get('/db', function (req, res) {
    res.send({
        db: process.env.DB_HOST
    });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
