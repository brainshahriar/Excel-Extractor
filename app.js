const express = require('express');
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
dotenv.config();
const PORT = process.env.PORT || 3000;

const excelRoutes = require('./routes/excelRoutes');
const dbConnection = require('./config/db');

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//file uploader path set
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// database configuration
dbConnection();

//routes
app.use('/excel',excelRoutes);
