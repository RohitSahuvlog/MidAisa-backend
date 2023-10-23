const router = require("express");
const TravelForm = require("../models/travelform.model");
const travelrouter = router();

travelrouter.post('/addtraveldata', async (req, res) => {
    try {
        const newTravelForm = req.body;
        const travelForm = await TravelForm.create(newTravelForm);
        res.status(201).json(travelForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

travelrouter.get('/gettravel/:formId', async (req, res) => {
    try {
        const formId = req.params.formId;
        const travelForm = await TravelForm.findById(formId);
        if (!travelForm) {
            return res.status(404).json({ message: 'Travel form not found' });
        }
        res.status(200).json(travelForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a specific travel form by ID (Admin action)
travelrouter.delete('/travelForms/:formId', async (req, res) => {
    try {
        const formId = req.params.formId;
        const travelForm = await TravelForm.findByIdAndRemove(formId);

        if (!travelForm) {
            return res.status(404).json({ message: 'Travel form not found' });
        }

        res.status(200).json({ message: 'Travel form deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


travelrouter.get('/get-all-travelforms', async (req, res) => {
    try {
        const allTravelForms = await TravelForm.find();
        res.status(200).json(allTravelForms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { travelrouter }
