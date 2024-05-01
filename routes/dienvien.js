var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const dienvien = require ('../controllers/dienvien.Controller')
var db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'infinity_movie'
});
db.connect(() => console.log('Đã kết nối đến cơ sở dữ liệu'));

// API endpoint lấy danh sách diễn viên
router.get('/dien-vien',dienvien.getDienVien)


// API endpoint thêm diễn viên mới
router.post('/dien-vien',dienvien.postDienVien)


// API endpoint lấy chi tiết diễn viên theo ID
router.get('/dien-vien/:id', dienvien.idDienVien)

// Endpoint để xóa một diễn viên
router.delete('/dien-vien/:id', dienvien.deleteDienVien)



// Endpoint để cập nhật thông tin của diễn viên
router.put('/dien-vien/:id',dienvien.updateDienVien)


// --------------- DANH SÁCH DIỄN VIÊN PHIM ---------------------


// API endpoint lấy danh sách diễn viên trong phim
router.get('/ds-dienvien-phim', dienvien.getDS_dienvien)


// API endpoint thêm diễn viên vào phim mới
router.post('/ds-dienvien-phim',dienvien.postDS_dienvien)


// API endpoint lấy danh sách diễn viên trong phim theo ID phim
router.get('/ds-dienvien-phim/:id_phim', (req, res) => {
    const id_phim = req.params.id_phim;
    const query = 'SELECT * FROM ds_dienvien_phim WHERE id_phim = ?';
    db.query(query, [id_phim], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports= router
