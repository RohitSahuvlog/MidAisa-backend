const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfschema = new Schema({
    pdf_link: {
        type: String,
        required: false
    },
});

const pdfModule = mongoose.model("PDF", pdfschema);
module.exports = pdfModule;
