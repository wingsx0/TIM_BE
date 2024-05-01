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

// API endpoint lấy danh sách phòng
router.get('/phong', (req, res) => {
    const sql = 'SELECT * FROM phong';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json(results);
        }
    });
});

// API endpoint lấy thông tin phòng theo ID
router.get('/phong/:id', (req, res) => {
    const idPhong = req.params.id;
    const sql = 'SELECT * FROM phong WHERE id_phong = ?';
    db.query(sql, [idPhong], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Không tìm thấy phòng');
            }
        }
    });
});

// API endpoint thêm phòng mới
router.post('/phong', (req, res) => {
    const { id_phong, id_ghe, hang, cot, tong_so_ghe } = req.body;
    const sql = 'INSERT INTO phong (id_phong, id_ghe, hang, cot, tong_so_ghe) VALUES (?, ?, ?, ?, ?)';
    const values = [id_phong, id_ghe, hang, cot, tong_so_ghe];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi thêm phòng mới:', err);
            res.status(500).send('Lỗi thêm phòng mới');
        } else {
            res.status(201).send('Thêm phòng mới thành công');
        }
    });
});

// API endpoint xóa phòng
router.delete('/phong/:id', (req, res) => {
    const idPhong = req.params.id;
    const sql = 'DELETE FROM phong WHERE id_phong = ?';
    db.query(sql, [idPhong], (err, results) => {
        if (err) {
            console.error('Lỗi xóa phòng:', err);
            res.status(500).send('Lỗi xóa phòng');
        } else {
            res.status(200).send('Xóa phòng thành công');
        }
    });
});
// API endpoint ẩn phòng
router.put('/phong/:id/hidden', (req, res) => {
    const idPhong = req.params.id;
    const sql = 'UPDATE phong SET is_hidden = 1 WHERE id_phong = ?';
    db.query(sql, [idPhong], (err, results) => {
        if (err) {
            console.error('Lỗi ẩn phòng:', err);
            res.status(500).send('Lỗi ẩn phòng');
        } else {
            res.status(200).send('Phòng đã được ẩn');
        }
    });
});

// API endpoint cập nhật thông tin phòng
router.put('/phong/:id', (req, res) => {
    const idPhong = req.params.id;
    const { id_ghe, hang, cot, tong_so_ghe } = req.body;
    const sql = 'UPDATE phong SET id_ghe = ?, hang = ?, cot = ?, tong_so_ghe = ? WHERE id_phong = ?';
    const values = [id_ghe, hang, cot, tong_so_ghe, idPhong];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi cập nhật thông tin phòng:', err);
            res.status(500).send('Lỗi cập nhật thông tin phòng');
        } else {
            res.status(200).send('Cập nhật thông tin phòng thành công');
        }
    });
});

module.exports = router;
