const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const removeFile = (file) => {
  try {
    require("fs").unlinkSync(file);
  } catch (e) {}
};

module.exports = { upload, removeFile };
