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

// API endpoint lấy danh sách vé
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM ve';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn danh sách vé:', err);
            res.status(500).send('Lỗi truy vấn danh sách vé');
        } else {
            res.status(200).json(results);
        }
    });
});

// API endpoint đặt vé mới
router.post('/dat-ve', (req, res) => {
    const { id_xuat_chieu, ten_ghe } = req.body;
    const sql = 'INSERT INTO ve (id_xuat_chieu, ten_ghe) VALUES (?, ?)';
    const values = [id_xuat_chieu, ten_ghe];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi đặt vé mới:', err);
            res.status(500).send('Lỗi đặt vé mới');
        } else {
            res.status(201).send('Đặt vé mới thành công');
        }
    });
});

// API endpoint hủy vé
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM ve WHERE id_ve = ?';

    db.query(sql, id, (err, results) => {
        if (err) {
            console.error('Lỗi hủy vé:', err);
            res.status(500).send('Lỗi hủy vé');
        } else {
            res.status(200).send('Hủy vé thành công');
        }
    });
});

module.exports = router;
