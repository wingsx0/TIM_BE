const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "infinity_movie",
});

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Đã kết nối đến cơ sở dữ liệu MySQL");
});

// Endpoint tìm kiếm theo tên phim và tên diễn viên
router.get("/", (req, res) => {
  const query = req.query.query;
  const sql = "SELECT * FROM phim WHERE ten_phim LIKE ?";

  if (query) {
    db.query(sql, ["%" + query + "%"], (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Lỗi truy vấn dữ liệu", results });
        return;
      }
      res.status(200).json({ message: "Tìm kiếm thành công ", results });
    });
  } else {
    res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm" });
  }
});

module.exports = router;
