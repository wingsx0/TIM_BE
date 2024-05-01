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
router.get("/", (req, res) => {
  const query = "SELECT * FROM the_loai";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
    } else {
      res.status(200).json(results);
    }
  });
});

// API endpoint lấy chi tiết the loai theo ID
router.get("/:id", (req, res) => {
  const id_the_loai = req.params.id;
  const query = "SELECT * FROM the_loai WHERE id_the_loai = ?";
  db.query(query, [id_the_loai], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).send("Không tìm thấy the loai phim");
      }
    }
  });
});

// Thêm thể loại mới
router.post("/", (req, res) => {
  const { ten_loai } = req.body;
  const query = "INSERT INTO the_loai (ten_loai) VALUES (?)";
  db.query(query, [ten_loai], (err, results) => {
    if (err) {
      console.error("Lỗi thêm thể loại mới:", err);
      res.status(500).send("Lỗi thêm thể loại mới");
    } else {
      res.status(201).send("Thêm thể loại mới thành công");
    }
  });
});

// Xóa thể loại
router.delete("/:id", (req, res) => {
  const id_loai = req.params.id;
  const query = "DELETE FROM the_loai WHERE id_loai = ?";
  db.query(query, [id_loai], (err, results) => {
    if (err) {
      console.error("Lỗi xóa thể loại:", err);
      res.status(500).send("Lỗi xóa thể loại");
    } else {
      res.status(200).send("Xóa thể loại thành công");
    }
  });
});

// Sửa thông tin thể loại
router.put("/:id", (req, res) => {
  const id_loai = req.params.id;
  const { ten_loai } = req.body;
  const query = "UPDATE the_loai SET ten_loai = ? WHERE id_loai = ?";
  db.query(query, [ten_loai, id_loai], (err, results) => {
    if (err) {
      console.error("Lỗi sửa thông tin thể loại:", err);
      res.status(500).send("Lỗi sửa thông tin thể loại");
    } else {
      res.status(200).send("Sửa thông tin thể loại thành công");
    }
  });
});

module.exports = router;
