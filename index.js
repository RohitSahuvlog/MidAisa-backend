const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { authentication } = require("./middlewares/authentication");
const { authroute } = require("./router/auth.route");
const { travelrouter } = require("./router/travel.route");
const path = require("path");
const { enquiryrouter } = require("./router/enquiry.route");
const countryRouter = require("./router/country.route");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));


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
// app.use("/travelform", travelrouter);


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


app.listen(PORT, async (req, res) => {
    try {
        await connection;
        console.log("connect to mongodb");
    } catch {
        console.log(" error connect to mongodb");
    }

    console.log(`server is start at ${PORT}`);
});
