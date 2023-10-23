const router = require("express");
const dotenv = require("dotenv");
const Enquiry = require("../models/enquiry.model");
const enquiryrouter = router();
dotenv.config();
enquiryrouter.post('/addenquiries', async (req, res) => {
    try {
        const newEnquiry = req.body;
        const enquiry = await Enquiry.create(newEnquiry);
        res.status(201).json(enquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

enquiryrouter.get('/getenquiries', async (req, res) => {
    try {
        const allEnquiries = await Enquiry.find();
        res.status(200).json(allEnquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

enquiryrouter.get('/enquiries/:enquiryId', async (req, res) => {
    try {
        const enquiryId = req.params.enquiryId;
        const enquiry = await Enquiry.findById(enquiryId);

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.status(200).json(enquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

enquiryrouter.put('/enquiries/:enquiryId', async (req, res) => {
    try {
        const enquiryId = req.params.enquiryId;
        const updatedEnquiry = req.body;
        const enquiry = await Enquiry.findByIdAndUpdate(enquiryId, updatedEnquiry, { new: true });

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.status(200).json(enquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

enquiryrouter.delete('/enquiries/:enquiryId', async (req, res) => {
    try {
        const enquiryId = req.params.enquiryId;
        const enquiry = await Enquiry.findByIdAndRemove(enquiryId);

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.status(200).json({ message: 'Enquiry form deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { enquiryrouter }