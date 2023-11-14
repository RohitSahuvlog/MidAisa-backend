const express = require('express');
const formRouter = express.Router();
const FormSubmission = require('../models/enquiry-form'); // Import the FormSubmission model

formRouter.post('/submit', async (req, res) => {
    try {
        const newSubmission = new FormSubmission(req.body);
        await newSubmission.save();

        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

formRouter.get('/submissions', async (req, res) => {
    try {
        const submissions = await FormSubmission.find();
        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

formRouter.get('/submissions/:id', async (req, res) => {
    try {
        const submission = await FormSubmission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: 'Form submission not found' });
        }
        res.json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

formRouter.put('/submissions/:id', async (req, res) => {
    try {
        const submission = await FormSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!submission) {
            return res.status(404).json({ error: 'Form submission not found' });
        }
        res.json({ message: 'Form submission updated successfully', submission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

formRouter.delete('/submissions/:id', async (req, res) => {
    try {
        const submission = await FormSubmission.findByIdAndRemove(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: 'Form submission not found' });
        }
        res.json({ message: 'Form submission deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});







module.exports = formRouter;
