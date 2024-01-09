import mongoose from 'mongoose';

const requiredString = {
	type: String,
	required: true
};

const requiredNumber = {
	type: Number,
	required: true
};

const ProducersSchema = new mongoose.Schema({
	_id: requiredString,
	producerName: requiredString,
	emptyWeight: requiredNumber,
	spoolSize: requiredNumber
});

const collectionName = 'producers';

export const ProducersModel =
	mongoose.models.ProducersModel ??
	mongoose.model<ProducerModelInterface>(collectionName, ProducersSchema, collectionName);
