const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema({

    message: {
        type: String,
        required: false
    },
    create_at: {
        type: Date,
        default: new Date(),
    }
});

const queryModel = mongoose.model("feedBack", querySchema);
module.exports = queryModel;
