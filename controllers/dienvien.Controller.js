var express = require('express');
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'infinity_movie'
});
db.connect(() => console.log('Đã kết nối đến cơ sở dữ liệu'));

const getDienVien = async function (req, res, next) {
    const query = 'SELECT * FROM dien_vien';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json(results);
        }
    });
}


const postDienVien = async function (req, res, next) {
    try {
        const data = req.body;
        const query = 'INSERT INTO dien_vien SET ?';

        await db.query(query, data);
        res.status(201).send('Thêm diễn viên mới thành công');
    } catch (error) {
        console.error('Lỗi thêm diễn viên mới:', error);
        res.status(500).send('Lỗi thêm diễn viên mới');
    }
}

const idDienVien = async function (req, res) {
    const id_dien_vien = req.params.id;
    const query = 'SELECT * FROM dien_vien WHERE id_dien_vien = ?';
    db.query(query, [id_dien_vien], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Không tìm thấy diễn viên');
            }
        }
    });
}


const deleteDienVien = async function (req, res) {
    const id_dien_vien = req.params.id;

    try {
        // Kiểm tra xem diễn viên có tồn tại không
        const checkQuery = 'SELECT * FROM dien_vien WHERE id_dien_vien = ?';
        const checkResult = await db.query(checkQuery, [id_dien_vien]);

        if (checkResult.length === 0) {
            res.status(404).send('Không tìm thấy diễn viên');
            return;
        }

        // Nếu tồn tại, thực hiện xóa
        const deleteQuery = 'DELETE FROM dien_vien WHERE id_dien_vien = ?';
        await db.query(deleteQuery, [id_dien_vien]);

        res.status(200).json({ message: 'Xóa diễn viên thành công' });
    } catch (error) {
        console.error('Lỗi xóa diễn viên:', error);
        res.status(500).send('Lỗi xóa diễn viên');
    }
}

const updateDienVien = async function (req, res) {
    const id_dien_vien = req.params.id;
    const newData = req.body;

    try {
        // Kiểm tra xem diễn viên có tồn tại không
        const checkQuery = 'SELECT * FROM dien_vien WHERE id_dien_vien = ?';
        const checkResult = await db.query(checkQuery, [id_dien_vien]);

        if (checkResult.length === 0) {
            res.status(404).send('Không tìm thấy diễn viên');
            return;
        }

        // Nếu tồn tại, thực hiện cập nhật thông tin
        const updateQuery = 'UPDATE dien_vien SET ? WHERE id_dien_vien = ?';
        await db.query(updateQuery, [newData, id_dien_vien]);

        res.status(200).json({ message: 'Cập nhật thông tin diễn viên thành công' });
    } catch (error) {
        console.error('Lỗi cập nhật thông tin diễn viên:', error);
        res.status(500).send('Lỗi cập nhật thông tin diễn viên');
    }
}

const getDS_dienvien = async function (req, res) {
    const query = 'SELECT * FROM ds_dienvien_phim';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json(results);
        }
    });
}
const postDS_dienvien = async function (req, res) {
    try {
        const data = req.body;
        const query = 'INSERT INTO ds_dienvien_phim SET ?';

        await db.query(query, data);
        res.status(201).send('Thêm diễn viên vào phim mới thành công');
    } catch (error) {
        console.error('Lỗi thêm diễn viên vào phim mới:', error);
        res.status(500).send('Lỗi thêm diễn viên vào phim mới');
    }
}


module.exports = {getDienVien, postDienVien, idDienVien, deleteDienVien, updateDienVien, getDS_dienvien , postDS_dienvien}