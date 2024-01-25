const fileModel = require("../models/fileModel");
const excelModel = require("../models/excelModel");
// const xlsx = require("xlsx");
const excel = require("exceljs");

const excelRoute = async (req, res) => {
  try {
    const uploadFile = req.file;
    const excelFile = await fileModel.create({
      filename: uploadFile.originalname,
      path: uploadFile.path,
      size: uploadFile.size,
    });
    res.status(200).json({
      success: true,
      message: "Upload file successfully",
      file: excelFile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error uploading Excel file.",
      error: error.message,
    });
  }
};

const calculateSumRoute = async (req, res) => {
  try {
    const fileId = req.params.id;

    // Retrieve Excel file from the database based on fileId
    const excelFile = await fileModel.findById(fileId);

    if (!excelFile) {
      return res.status(404).json({
        success: false,
        message: "Excel file not found",
      });
    }

    // Read Excel file
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(excelFile.path);

    // Access the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Sum the Salary column
    const names = [];
    let sumSalary = 0;
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const salary = row.getCell("C").value; // Assuming 'B' is the Salary column
      const name = row.getCell("B").value;
      if (typeof salary === "number") {
        sumSalary += salary;
      }
      if (name) {
        names.push(name);
      }
    });

    // Create a new document using the ResultModel
    const resultDoc = new excelModel({
      names: names,
      sum: sumSalary,
    });

    // Save the document to the database
    await resultDoc.save();

    res.status(200).json({
      success: true,
      sumSalary: sumSalary,
      names: names,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error calculating sum",
      error: error.message,
    });
  }
};

module.exports = { excelRoute, calculateSumRoute };
