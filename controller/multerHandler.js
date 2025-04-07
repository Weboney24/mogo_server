const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: function (req, file, cb) {
    console.log(req);
    cb(null, `${Date.now()}${path.extname(file?.originalname)}`);
  },
  onError: (err, callback) => {
    console.log(err);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
