const mongoose = require("mongoose");
const dbName = "nes";
const URI = `mongodb://localhost:27017/${dbName}`;

const connectDB = async () => {
  try {
    let result = await mongoose.connect(URI);
    console.log(`Database Connected - ${dbName}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
