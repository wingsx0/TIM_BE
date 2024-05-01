var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'infinity_movie'
});
db.connect(() => console.log('Đã kết nối đến cơ sở dữ liệu'));

const listMovie = async function (req, res) {
    const query = "SELECT * FROM phim";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn:", err);
        res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
      } else {
        res.status(200).json(results);
      }
    });
}

const createMovie =  async function (req, res) {
    try {
        const data = req.body;
        if (!data){
          res.status(400).send("Vui lòng nhập đẩy đủ thông tin");
          return;
        }
        const query = "INSERT INTO phim SET ?";
    
        await db.query(query, data);
        res.status(201).send("Thêm phim mới thành công");
      } catch (error) {
        console.error("Lỗi thêm phim mới:", error);
        res.status(500).send("Lỗi thêm phim mới");
      }
}

const  detailMovie = async function (req, res) {
    const id_phim = req.params.id;
    const query = "SELECT * FROM phim WHERE id_phim = ?";
    db.query(query, [id_phim], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).send("Không tìm thấy phim");
      }
    }
  });
}
const deleteMovie = async function (req, res) {
    const id_phim = req.params.id;
    const query = "DELETE FROM phim WHERE id_phim = ?";
  
    db.query(query, [id_phim], (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn:", err);
        res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
      } else {
        if (results.affectedRows > 0) {
          res.status(200).send("Bộ phim đã được xóa thành công");
        } else {
          res.status(404).send("Không tìm thấy bộ phim để xóa");
        }
      }
    });
}
const updetaMovie = async function (req, res) {
    const id_phim = req.params.id;
    const data = req.body;
  
    try {
      const query = "UPDATE phim SET ? WHERE id_phim = ?";
      await db.query(query, [data, id_phim]);
      res.status(200).json({ message: "Cập nhật thông tin phim thành công" });
    } catch (error) {
      console.error("Lỗi cập nhật thông tin phim:", error);
      res.status(500).send("Lỗi cập nhật thông tin phim");
    }
}

const listMovieId = async function (req, res) {
    const id_loai = req.params.id_loai;

    // Truy vấn SQL để lấy danh sách phim dựa trên id_loai
    const sql = "SELECT * FROM phim WHERE id_loai = ?";
  
    db.query(sql, [id_loai], (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn danh sách phim theo loại:", err);
        res.status(500).send("Lỗi truy vấn danh sách phim theo loại");
      } else {
        res.status(200).json(results);
      }
    });
}

const listMovieCategori = async function (req,res) {
    const id_the_loai = req.params.id_the_loai;

    try {
        const query = "SELECT * FROM phim WHERE id_the_loai = ?";
        const results = await db.query(query, [id_the_loai]);
        res.status(200).json(results);
    } catch (error) {
        console.error("Lỗi truy vấn danh sách phim theo thể loại:", error);
        res.status(500).send("Lỗi truy vấn danh sách phim theo thể loại");
    }
}
const listMovieActress  =  async function (req, res) {
    const id_dien_vien = req.params.id_dien_vien;

    try {
        const query = "SELECT * FROM phim WHERE id_dsdv_phim = ?";
        const results = await db.query(query, [id_dien_vien]);
        res.status(200).json(results);
    } catch (error) {
        console.error("Lỗi truy vấn danh sách phim theo diễn viên:", error);
        res.status(500).send("Lỗi truy vấn danh sách phim theo diễn viên");
    }
}


module.exports = {listMovie ,createMovie  ,detailMovie , deleteMovie , updetaMovie ,listMovieId , listMovieCategori , listMovieActress}