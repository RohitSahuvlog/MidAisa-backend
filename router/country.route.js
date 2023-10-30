const express = require('express');
const countryRouter = express.Router();
const Country = require('../models/country.model');
countryRouter.get('/get-allcountry', async (req, res) => {
    try {
        const countries = await Country.find();
        res.send(countries);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

countryRouter.get('/get-country', async (req, res) => {
    const { country } = req.query;
    if (!country) {
        return res.status(400).send({ error: 'Country name is required' });
    }

    try {
        const lowercaseCountry = country.toUpperCase();

        const countryData = await Country.findOne({ country: lowercaseCountry });
        if (!countryData) {
            return res.status(404).send({ message: 'Country not found' });
        }

        res.status(200).send(countryData);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

countryRouter.get('/get-country/:id', async (req, res) => {
    try {
        const countryData = await Country.findById(req.params.id);
        if (!countryData) {
            return res.status(404).send({ message: 'Country not found' });
        }
        res.status(200).send(countryData);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

countryRouter.post('/add-country', async (req, res) => {
    const country = new Country(req.body);
    try {
        const newCountry = await country.save();
        res.status(201).send(newCountry);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

countryRouter.put('/update-country/:id', async (req, res) => {
    try {
        const updatedCountry = await Country.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCountry) {
            return res.status(404).send({ message: 'Country not found' });
        }
        res.status(200).send(updatedCountry);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Delete a specific listing item by country ID and listing item ID
countryRouter.delete('/delete-listing-item/:countryId/:listingItemId', async (req, res) => {
    try {
        const country = await Country.findById(req.params.countryId);
        if (!country) {
            return res.status(404).send({ message: 'Country not found' });
        }
        country.listing = country.listing.filter((item) => item._id != req.params.listingItemId);
        const updatedCountry = await country.save();
        res.send(updatedCountry);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

countryRouter.delete('/delete/:id', async (req, res) => {
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
