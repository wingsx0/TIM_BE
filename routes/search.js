const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infinity_movie'
});

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu MySQL');
});


// Endpoint tìm kiếm theo tên phim và tên diễn viên
router.get('/', (req, res) => {
    const { ten_phim  } = req.query; // Lấy query từ query parameter

    if (!ten_phim) {
        return res.status(400).json({ error: "Vui lòng nhập từ khóa tìm kiếm" });
    }

    // Sử dụng SQL query để tìm kiếm tên phim và tên diễn viên trong cơ sở dữ liệu
    const sql = "SELECT * FROM phim WHERE ten_phim LIKE '%" + ten_phim + "%' ";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        } else {
            res.status(200).json(results); // Trả về kết quả tìm kiếm
        }
    });
});

module.exports = router;
