const router = require("express");
const userrouter = router();
const formModule = require("../models/form.model");
const appointmentForm = require("../models/appointment");



userrouter.post('/form', async (req, res) => {
    const formData = req.body;

    try {
        console.log(formData)
        const form = new formModule(formData);
        await form.save();



        res.status(201).send({ message: 'Form submission successful' });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'An error occurred while saving/retrieving the form(s)' });
    }
});


userrouter.get('/form', async (req, res) => {
    try {
        const forms = await formModule.find().sort({ create_at: -1 });
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving form data' });
    }
});

userrouter.post('/appointment', async (req, res) => {
    const { name, email, contact } = req.body;

    try {
        const form = new appointmentForm({ name, email, contact });
        await form.save();
        res.status(200).send({ message: 'Form data saved successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to save form data' });
    }
});


userrouter.get('/appointment', async (req, res) => {
    try {
        const forms = await appointmentForm.find().sort({ create_at: -1 });;
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch form data' });
    }
});
module.exports = {
    userrouter
};
