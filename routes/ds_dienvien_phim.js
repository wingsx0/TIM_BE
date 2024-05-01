var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'infinity_movie'
});
db.connect(() => console.log('Đã kết nối đến cơ sở dữ liệu'));

// Lấy danh sách diễn viên trong phim
router.get('/ds_dienvien_phim/:id_phim', (req, res) => {
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

// Thêm diễn viên vào danh sách diễn viên của phim
router.post('/ds_dienvien_phim', async (req, res) => {
    try {
        const { id_phim, id_dien_vien, vai_dien } = req.body;
        const query = 'INSERT INTO ds_dienvien_phim (id_phim, id_dien_vien, vai_dien) VALUES (?, ?, ?)';
        await db.query(query, [id_phim, id_dien_vien, vai_dien]);
        res.status(201).send('Thêm diễn viên vào danh sách thành công');
    } catch (error) {
        console.error('Lỗi thêm diễn viên vào danh sách:', error);
        res.status(500).send('Lỗi thêm diễn viên vào danh sách');
    }
});

// Xóa diễn viên khỏi danh sách diễn viên của phim
router.delete('/ds_dienvien_phim/:id', async (req, res) => {
    const id_dienvien_phim = req.params.id;

    try {
        const query = 'DELETE FROM ds_dienvien_phim WHERE id_dienvien_phim = ?';
        await db.query(query, [id_dienvien_phim]);
        res.status(200).send('Xóa diễn viên khỏi danh sách thành công');
    } catch (error) {
        console.error('Lỗi xóa diễn viên khỏi danh sách:', error);
        res.status(500).send('Lỗi xóa diễn viên khỏi danh sách');
    }
});

module.exports = router;
