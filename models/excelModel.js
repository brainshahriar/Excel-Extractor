const mongoose = require("mongoose");

const excelSchema = mongoose.Schema(
  {
    sum: {
      type: String,
    },
    names: {
      type: [String], // Specify that 'names' is an array of strings
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Excel", excelSchema);
