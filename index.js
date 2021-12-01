"use strict";
exports.__esModule = true;
var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!, how are you?');
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
