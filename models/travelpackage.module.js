const mongoose = require('mongoose');

const travelPackageSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    singleSupplementPrice: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
    activity_level: {
        type: String,
        required: true,
    },
});

const TravelPackage = mongoose.model('TravelPackage', travelPackageSchema);

module.exports = TravelPackage;
