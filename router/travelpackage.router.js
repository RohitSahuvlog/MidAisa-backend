const express = require('express');
const travelPackage = express.Router();
const TravelPackage = require('../models/travelpackage.module'); // Assuming this is the path to your model

travelPackage.post('/travel-packages', async (req, res) => {
    try {
        const travelPackage = new TravelPackage(req.body);
        await travelPackage.save();
        res.status(201).json(travelPackage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

travelPackage.get('/travel-packages', async (req, res) => {
    try {
        const travelPackages = await TravelPackage.find();
        res.json(travelPackages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

travelPackage.get('/travel-packages/:id', async (req, res) => {
    try {
        const travelPackage = await TravelPackage.findById(req.params.id);
        if (!travelPackage) {
            return res.status(404).json({ error: 'Travel package not found' });
        }
        res.json(travelPackage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

travelPackage.get('/travel-packages/:country', async (req, res) => {
    try {
        const travelPackage = await TravelPackage.findById({ country: req.params.country });
        if (!travelPackage) {
            return res.status(404).json({ error: 'Travel package not found' });
        }
        res.json(travelPackage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

travelPackage.put('/travel-packages/:id', async (req, res) => {
    try {
        const travelPackage = await TravelPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!travelPackage) {
            return res.status(404).json({ error: 'Travel package not found' });
        }
        res.json(travelPackage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

travelPackage.delete('/travel-packages/:id', async (req, res) => {
    try {
        const travelPackage = await TravelPackage.findByIdAndRemove(req.params.id);
        if (!travelPackage) {
            return res.status(404).json({ error: 'Travel package not found' });
        }
        res.json({ message: 'Travel package deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = travelPackage;
