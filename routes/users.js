var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require("bcryptjs");
const users = require("../controllers/users.Controller");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "infinity_movie",
});
db.connect(() => console.log("Đã kết nối đến cơ sở dữ liệu"));

// Tạo Tài Khoản
router.post("/register", function (req, res, next) {
  try {
    var ho_ten = req.body.ho_ten;
    var email = req.body.email;
    var password = req.body.password;

    // Kiểm tra dữ liệu
    if (!ho_ten || !email || !password) {
      return res.json({ error: "Vui lòng nhập đủ dữ liệu" });
    }

    // Kiểm tra độ dài tên
    if (ho_ten.length > 50 || ho_ten.length < 6) {
      return res.json({ error: "Tên người dùng phải có từ 6 đến 50 ký tự" });
    }

    // Kiểm tra email đã tồn tại trong db chưa
    db.query(
      "SELECT * FROM thanh_vien WHERE email = ?",
      [email],
      function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          return res.json({ error: "Email này đã tồn tại" });
        } else {
          // Mã hóa mật khẩu
          var salt = bcrypt.genSaltSync(10);
          var hashPassword = bcrypt.hashSync(password, salt);

          // Tạo mới user
          db.query(
            "INSERT INTO thanh_vien (ho_ten, email, password) VALUES (?, ?, ?)",
            [ho_ten, email, hashPassword],
            function (err, result) {
              if (err) throw err;
              res.json({ message: "Tạo tài khoản thành công", result });
            }
          );
        }
      }
    );
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Đăng Nhập
router.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  db.query(
    "SELECT * FROM thanh_vien WHERE email = ?",
    [email],
    function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        return res.json({ error: "Email không tồn tại" });
      }

      var user = result[0];

      // Kiểm tra xem password và user.password có phải là chuỗi không
      if (
        typeof password !== "string" ||
        typeof user.password !== "string" ||
        user.password === ""
      ) {
        return res.json({ error: "Mật khẩu không hợp lệ" });
      }

      var check = bcrypt.compareSync(password, user.password);

      if (!check) {
        return res.json({ error: "Mật Khẩu Không Chính Xác", status: 401 });
      }

      // var token = jwt.sign({ id: user.id }, "your-secret-key", {
      //   expiresIn: "1m",
      // });

      res.json({ message: "Đăng Nhập Thành Công", user: user, status: 200 });
    }
  );
});

// Đổi Mật Khẩu
router.put("/changepassword", function (req, res, next) {
  const { email, password, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json("Mật khẩu mới không được để trống");
  }

  db.query(
    "SELECT password FROM thanh_vien WHERE email = ?",
    [email],
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }

      if (result.length === 0) {
        return res.status(400).json("Không tìm thấy người dùng với email này");
      }

      const user = result[0];

      if (
        !password ||
        typeof password !== "string" ||
        !user.password ||
        typeof user.password !== "string"
      ) {
        return res.status(400).json("Mật khẩu không hợp lệ");
      }

      const check = bcrypt.compareSync(password, user.password);

      if (!check) {
        return res.status(400).send("Mật khẩu không chính xác");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newPassword, salt);

      db.query(
        "UPDATE thanh_vien SET password = ? WHERE email = ?",
        [hashPassword, email],
        function (err, result) {
          if (err) {
            return res.status(500).json(err.message);
          }

          res.json("Bạn đã đổi mật khẩu thành công");
        }
      );
    }
  );
});

// Lấy danh sách tài khoản
router.get("/tai_khoan", function (req, res, next) {
  db.query("SELECT * FROM thanh_vien", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//  Đăng Xuất Tài khoản
router.post("/logout", users.logoutUser);

// Lấy Lại Mật khẩu
// Khởi tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Sử dụng SSL
  auth: {
    user: "nguyenducduong281003@gmail.com", // Email của bạn
    pass: "nnmgennriedbetnr", // Mật khẩu của bạn
  },
});
// Lấy mật khẩu ngẫu nhiên và gửi qua email
router.post("/forgotpassword", function (req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json("Email không được để trống");
  }

  // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu hay không
  db.query(
    "SELECT * FROM thanh_vien WHERE email = ?",
    [email],
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }

      if (result.length === 0) {
        return res.status(404).json("Email không tồn tại trong cơ sở dữ liệu.");
      }

      // Tạo mật khẩu ngẫu nhiên
      const newPassword = randomstring.generate(8); // Tạo mật khẩu gồm 8 ký tự ngẫu nhiên

      // Lưu mật khẩu mới vào cơ sở dữ liệu
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newPassword, salt);

      db.query(
        "UPDATE thanh_vien SET password = ? WHERE email = ?",
        [hashPassword, email],
        function (err, result) {
          if (err) {
            return res.status(500).json(err.message);
          }

          // Gửi mật khẩu mới qua email
          transporter.sendMail(
            {
              to: email,
              subject: "Mật khẩu mới Movie Infinity",
              html: `Mật khẩu mới của bạn là: <strong>${newPassword}</strong>`,
            },
            function (error, info) {
              if (error) {
                return res.status(500).json(error.message);
              }
              res.json({
                message: "Mật khẩu mới đã được gửi đến email của bạn.",
              });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
