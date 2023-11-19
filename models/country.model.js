const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    image: String,
    heading: String,
    text: String,
    destination: String,
    duration: String,
    interests: String,
    priceperperson: String,
});

const countrySchema = new mongoose.Schema({
    country: { type: String, unique: true },
    overviewlefth: String,
    overviewrighth: String,
    itineryheading: String,
    carousalimages: Array,
    listing: [itinerarySchema],
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
