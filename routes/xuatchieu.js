const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infinity_movie'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu MySQL');
});

// API endpoint lấy danh sách xuất chiếu
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM xuat_chieu';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn danh sách xuất chiếu:', err);
            res.status(500).send('Lỗi truy vấn danh sách xuất chiếu');
        } else {
            res.status(200).json(results);
        }
    });
});

// API endpoint tạo xuất chiếu mới
router.post('/', (req, res) => {
    const { id_phim, id_phong, bat_dau, ket_thuc, gia } = req.body;
    if(!bat_dau || !ket_thuc|| !gia) {
        return res.json({ error: "Vui lòng nhập đủ trường" });

    }
    const sql = 'INSERT INTO xuat_chieu (id_phim, id_phong, bat_dau, ket_thuc, gia) VALUES (?, ?, ?, ?, ?)';
    const values = [id_phim, id_phong, bat_dau, ket_thuc, gia];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi tạo xuất chiếu mới:', err);
            res.status(500).send('Lỗi tạo xuất chiếu mới');
        } else {
            res.status(201).send('Tạo xuất chiếu mới thành công');
        }
    });
});

// API endpoint cập nhật thông tin xuất chiếu
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { id_phim, id_phong, bat_dau, ket_thuc, gia } = req.body;
    if(!bat_dau || !ket_thuc|| !gia) {
        return res.json({ error: "Vui lòng nhập đủ trường" });

    }
    const sql = 'UPDATE xuat_chieu SET id_phim = ?, id_phong = ?, bat_dau = ?, ket_thuc = ?, gia = ? WHERE id_xuat_chieu = ?';
    const values = [id_phim, id_phong, bat_dau, ket_thuc, gia, id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi cập nhật thông tin xuất chiếu:', err);
            res.status(500).send('Lỗi cập nhật thông tin xuất chiếu');
        } else {
            res.status(200).send('Cập nhật thông tin xuất chiếu thành công');
        }
    });
});

module.exports = router;
