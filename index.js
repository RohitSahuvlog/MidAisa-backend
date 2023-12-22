const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { authentication } = require("./middlewares/authentication");
const { authroute } = require("./router/auth.route");
const { travelrouter } = require("./router/travel.route");
const path = require("path");
const { enquiryrouter } = require("./router/enquiry.route");
const countryRouter = require("./router/country.route");
const footerRouter = require("./router/footer.route");
const travelPackage = require("./router/travelpackage.router");
const formRouter = require("./router/enquiryform.route");
require("dotenv").config();
const app = express();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

app.use(express.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

app.use(express.json());
app.use(cors());
PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Home page");
});

app.use("/api/auth", authroute);
app.use("/travel", travelrouter);
app.use("/enquiry", enquiryrouter);
app.use('/api/countries', countryRouter);
app.use('/api/footer', footerRouter);
app.use("/api/package", travelPackage);
app.use("/api/enquiryform", formRouter);


app.get('/download/:filename', function (req, res) {
    const fileName = req.params.filename.toString();
    const filePath = path.join(__dirname, 'uploads', fileName);
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-Type', 'application/pdf');

    res.sendFile(filePath, function (err) {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });
});

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/api/cloudinary/upload', upload.array('file', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded.' });
        }

        const promises = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
                folder: 'country-image',
            });
            return result;
        });

        const results = await Promise.all(promises);

        res.json(results);
    } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload images to Cloudinary' });
    }
});

app.listen(PORT, async (req, res) => {
    try {
        await connection;
        console.log("connect to mongodb");
    } catch {
        console.log(" error connect to mongodb");
    }

    console.log(`server is start at ${PORT}`);
});
