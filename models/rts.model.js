const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RTSchema = new Schema({
		_id: { type: Schema.ObjectId, auto: true },
		rts: [Number] 
}, { versionKey: false });


// Export the model

module.exports = mongoose.model('rt', RTSchema);
