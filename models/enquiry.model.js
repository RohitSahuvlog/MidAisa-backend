const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    isAgencyCheck: Boolean,
    advisorName: String,
    agencyName: String,
    email: String,
    country: String,
    phone: String,
    destinations: [String],
    startMonth: String,
    startYear: String,
    tripLength: String,
    budget: String,
    travelers: String,
    enquiryDetails: String,
    subscribe: Boolean
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
