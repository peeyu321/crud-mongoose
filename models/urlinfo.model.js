const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let URLInfoSchema = new Schema({
    url: {type: String, required: true},
    method: {type: String, required: true, max: 7},
    data: {any: Object},
    headers: {any: Object},
}, { versionKey: false });


// Export the model
module.exports = mongoose.model('Urlinfo', URLInfoSchema);
