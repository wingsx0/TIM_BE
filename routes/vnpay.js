// the_loai.js
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "infinity_movie",
});

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
  if (err) throw err;
  console.log("Đã kết nối đến cơ sở dữ liệu");
});

// Lấy danh sách thể loại

module.exports = router;
