const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    postalCode: String,
    travelForms: [{
        destination: String,
        travelDates: String,
        groupSize: Number,
        travelWith: {
            solo: Boolean,
            partner: Boolean,
            youngKids: Boolean,
            friends: Boolean,
            couples: Boolean,
            multiGenerationalFamily: Boolean,
            other: Boolean
        },
        travelDuration: String,
        budgetPerDay: String,
        travelOccasion: String,
        experiences: [String],
        accommodationType: [String]
    }]
});

const TravelForm = mongoose.model('TravelForm', userSchema);

module.exports = TravelForm;
