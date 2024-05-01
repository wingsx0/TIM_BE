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


// lấy Tất cả bình luận
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM binh_luan';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json(results);
        }
    });
});

// Thêm Bình Luận  và kiểm tra bạn đã đăng nhập thì mới cho  bình  luận 
// Endpoint kiểm tra đăng nhập
// router.get('/KTra_login', (req, res) => {
//     if (req.user) {
//         // Nếu người dùng đã đăng nhập, trả về thông tin người dùng hoặc một cờ đánh dấu đã đăng nhập
//         res.status(200).json({ loggedIn: true, user: req.user });
//     } else {
//         // Nếu người dùng chưa đăng nhập, trả về cờ đánh dấu chưa đăng nhập
//         res.status(401).json({ loggedIn: false, message: "Vui lòng đăng nhập để thực hiện thao tác này" });
//     }
// });

// Endpoint thêm bình luận
// router.post('/binh_luan', (req, res) => {
//     // Kiểm tra đăng nhập trước khi thêm bình luận
//     fetch('/api/KTra_login')
//     .then(response => {
//         if (response.loggedIn) {
//             // Người dùng đã đăng nhập, thêm bình luận vào cơ sở dữ liệu
//             const { id_phim, id_thanh_vien, noi_dung , ngay } = req.body;
//             if (!noi_dung) {
//                 return res.status(400).json({ error: "Vui lòng nhập nội dung bình luận" });
//             }
//             const sql = 'INSERT INTO binh_luan (id_phim, id_thanh_vien, noi_dung, ngay) VALUES (?, ?, ?, ?)';
//             db.query(sql, [id_phim, id_thanh_vien, noi_dung, ngay], (err, results) => {
//                 if (err) {
//                     console.error('Lỗi truy vấn:', err);
//                     res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
//                 } else {
//                     res.status(201).send('Thêm bình luận thành công');
//                 }
//             });
//         } else {
//             // Người dùng chưa đăng nhập, trả về thông báo lỗi
//             res.status(401).json({ error: "Vui lòng đăng nhập để thêm bình luận" });
//         }
//     })
//     .catch(error => {
//         console.error('Lỗi:', error);
//         res.status(500).json({ error: "Đã xảy ra lỗi khi kiểm tra đăng nhập" });
//     });
// });



// Thêm Bình Luận Ko cần bắt  đăng nhập
router.post('/binh_luan', (req, res) => {
    const { id_phim, id_thanh_vien, noi_dung , ngay } = req.body;
    if (!noi_dung) {
        return res.json({ error: "Vui lòng  Nhập bình luận"});
    }
    const sql = 'INSERT INTO binh_luan (id_phim, id_thanh_vien, noi_dung , ngay) VALUES (?,?,?,?)';
    
    db.query(sql, [id_phim, id_thanh_vien, noi_dung ,ngay], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(201).send('Thêm bình luận thành công');
        }
    });
})
module.exports = router;
