const multer = require("multer");

// Define file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// Specify file format
function fileFilter(req, file, cb) {
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // for .xlsx files
      file.mimetype === "application/vnd.ms-excel" || // for .xls files
      file.mimetype === "text/csv" || // for .csv files
      file.mimetype === "application/csv" ||
      file.mimetype === "application/excel"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only Excel and CSV files are allowed."), false);
    }
  }

const upload = multer({ storage, fileFilter });


module.exports = { upload };
