
const mongoose = require("mongoose")

require("dotenv").config()
mongoose.set("strictQuery", false);
const connection = mongoose
    .connect(process.env.mongo_url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("connection is successfully done"))
    .catch((error) => console.log("Error:" + error.message));

module.exports = { connection }