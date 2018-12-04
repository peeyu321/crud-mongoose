const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RTSchema = new Schema({
		id: { type: Schema.ObjectId },
		rts: [Number] 
}, { versionKey: false });

// Export the model

module.exports = mongoose.model('rt', RTSchema);
