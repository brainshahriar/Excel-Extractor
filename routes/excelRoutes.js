const express = require("express");
const router = express.Router();
const { excelRoute,calculateSumRoute  } = require("../controller/excelController");
const { upload } = require("../utils/fileUpload");

router.post("/", upload.single("file"), excelRoute);
router.post("/:id", calculateSumRoute );

module.exports = router;
