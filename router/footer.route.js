const express = require('express');
const footerRouter = express.Router();
const Footer = require('../models/footer.model');

footerRouter.get('/get-footer', async (req, res) => {
    try {
        const footerData = await Footer.findOne({}); // Assuming you have only one footer document
        res.status(200).send(footerData);
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

footerRouter.put('/update-footer', async (req, res) => {
    try {
        const updatedData = req.body;
        const footerData = await Footer.findOne({});

        if (!footerData) {
            const newFooter = new Footer(updatedData);
            await newFooter.save();
        } else {
            footerData.officeBranches = updatedData.officeBranches;
            footerData.contactInfo = updatedData.contactInfo;
            await footerData.save();
        }

        res.status(200).send({ message: 'Footer data updated successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = footerRouter;
