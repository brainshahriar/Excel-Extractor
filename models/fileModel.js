const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    filename: String,
    path: String,
    size: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema);
