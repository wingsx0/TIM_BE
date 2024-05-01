const express = require('express');
const app = express();

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Khai báo route mặc định
app.use((req, res, next) => {
  res.status(404).send('<h1>Not Found</h1><h2>404</h2><pre>NotFoundError: Not Found</pre>');
});

