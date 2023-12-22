const express = require('express');
const travelPackage = express.Router();
const TravelPackage = require('../models/travelpackage.module'); // Assuming this is the path to your model

travelPackage.post('/travel-packages', async (req, res) => {
    try {
        req.body.country = req.body.country.toUpperCase();
        const travelPackage = new TravelPackage({
            ...req.body,
            startDate: new Date(req.body.startDate).toISOString().split('T')[0],
            endDate: new Date(req.body.endDate).toISOString().split('T')[0],
        });
        await travelPackage.save();
        res.status(201).send(travelPackage);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

travelPackage.get('/travel-packages', async (req, res) => {
    try {
        const travelPackages = await TravelPackage.find();
        res.send(travelPackages);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

travelPackage.get('/get-travel-packages/:id', async (req, res) => {
    try {
        const travelPackage = await TravelPackage.findById(req.params.id);
        if (!travelPackage) {
            return res.status(404).send({ error: 'Travel package not found' });
        }
        res.send(travelPackage);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

travelPackage.get('/travel-packages/:country', async (req, res) => {
    try {
        const inputCountry = req.params.country;

        const regex = new RegExp('^' + inputCountry + '$', 'i');

        const travelPackage = await TravelPackage.findOne({
            country: { $regex: regex }
        });

        if (!travelPackage) {
            return res.status(400).send({ error: 'Travel package not found' });
        }

        res.status(200).send(travelPackage);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


travelPackage.put('/travel-packages/:id', async (req, res) => {
    try {
        console.log(req.body)
        const travelPackage = await TravelPackage.findByIdAndUpdate(req.params.id, {
            ...req.body,
            country: req.body.country.toUpperCase(),
            startDate: new Date(req.body.startDate).toISOString().split('T')[0],
            endDate: new Date(req.body.endDate).toISOString().split('T')[0],
        }, { new: true });
        if (!travelPackage) {
            return res.status(404).send({ error: 'Travel package not found' });
        }
        res.send(travelPackage);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

travelPackage.delete('/travel-packages/:id', async (req, res) => {
    try {
        const travelPackage = await TravelPackage.findByIdAndRemove(req.params.id);
        if (!travelPackage) {
            return res.status(404).send({ error: 'Travel package not found' });
        }
        res.send({ message: 'Travel package deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = travelPackage;
