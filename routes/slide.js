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

// API endpoint lấy danh sách slide
router.get("/", (req, res) => {
  const sql = "SELECT * FROM slide";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn danh sách slide:", err);
      res.status(500).send("Lỗi truy vấn danh sách slide");
    } else {
      res.status(200).json(results);
    }
  });
});

// API endpoint thêm slide mới
router.post("/", (req, res) => {
  const { img, link, noi_dung, tieu_de } = req.body;
  const sql =
    "INSERT INTO slide (img, link, noi_dung, tieu_de) VALUES (?, ?, ?, ?)";
  const values = [img, link, noi_dung, tieu_de];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Lỗi thêm slide mới:", err);
      res.status(500).send("Lỗi thêm slide mới");
    } else {
      res.status(201).send();
    }
  });
});

// API endpoint xóa slide
router.delete("/:id", (req, res) => {
  const idSlide = req.params.id;
  const sql = "DELETE FROM slide WHERE id_slide = ?";
  db.query(sql, [idSlide], (err, results) => {
    if (err) {
      console.error("Lỗi xóa slide:", err);
      res.status(500).send("Lỗi xóa slide");
    } else {
      res.status(200).send("Xóa slide thành công");
    }
  });
});

// API endpoint cập nhật thông tin slide
router.put("/:id", (req, res) => {
  const idSlide = req.params.id;
  const { img, link, noi_dung, tieu_de } = req.body;
  const sql =
    "UPDATE slide SET img = ?, link = ?, noi_dung = ?, tieu_de = ? WHERE id_slide = ?";
  const values = [img, link, noi_dung, tieu_de, idSlide];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Lỗi cập nhật slide:", err);
      res.status(500).send("Lỗi cập nhật slide");
    } else {
      res.status(200).send("Cập nhật slide thành công");
    }
  });
});

module.exports = router;
