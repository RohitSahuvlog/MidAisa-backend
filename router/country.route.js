const express = require('express');
const countryRouter = express.Router();
const Country = require('../models/country.model');
// countryRouter.get('/countries', async (req, res) => {
//     try {
//         const countries = await Country.find();
//         res.send(countries);
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// });

countryRouter.get('/countries', async (req, res) => {
    const { country } = req.query;
    if (!country) {
        return res.status(400).send({ error: 'Country name is required' });
    }

    try {
        const lowercaseCountry = country.toLowerCase();

        const countryData = await Country.findOne({ country: lowercaseCountry });

        if (!countryData) {
            return res.status(404).send({ message: 'Country not found' });
        }

        res.status(200).send(countryData);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

countryRouter.post('/countries', async (req, res) => {
    const country = new Country(req.body);
    try {
        const newCountry = await country.save();
        res.status(201).send(newCountry);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

countryRouter.put('/countries/:id', async (req, res) => {
    try {
        const updatedCountry = await Country.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCountry) {
            return res.status(404).send({ message: 'Country not found' });
        }
        res.send(updatedCountry);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Delete a specific country by ID
countryRouter.delete('/countries/:id', async (req, res) => {
    try {
        const deletedCountry = await Country.findByIdAndRemove(req.params.id);
        if (!deletedCountry) {
            return res.status(404).send({ message: 'Country not found' });
        }
        res.send({ message: 'Country deleted' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = countryRouter;
