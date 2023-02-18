const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

//MAKE CONNECTION WITH DATABASE
const connection = mongoose.connect(process.env.MONGO_URL)
module.exports = {connection};
