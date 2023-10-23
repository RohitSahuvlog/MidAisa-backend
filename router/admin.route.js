const multer = require('multer');
const dotenv = require("dotenv");
dotenv.config();
const router = require("express");
const User = require("../models/user.models");
const storage = require('../middlewares/fileconfig');
const pdfModule = require('../models/pdf.module');
const adminroute = router();

const upload = multer({
    storage: storage
});

adminroute.post("/", upload.array('files', 17), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            res.status(400).send('No files uploaded.');
            return;
        }

        const fileLinks = req.files.map(file => file.filename);

        const uploads = fileLinks.map(fileLink => new pdfModule({ pdf_link: fileLink }));
        await Promise.all(uploads.map(upload => upload.save()));

        res.status(201).send({ message: "Successfully upload" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});


adminroute.get("/", async (req, res) => {
    try {
        const pdfDocuments = await pdfModule.find();
        res.send(pdfDocuments);
    } catch (error) {
        console.error("Error in fetching PDF documents:", error);
        res.status(500).send({ message: "Internal server error." });
    }
});




module.exports = {
    adminroute,
};
