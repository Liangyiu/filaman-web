import mongoose from 'mongoose';

const requiredString = {
	type: String,
	required: true
};

const requiredNumber = {
	type: Number,
	required: true
};

const StockSchema = new mongoose.Schema({
	_id: requiredString,
	color: requiredString,
	diameter: requiredNumber,
	material: requiredString,
	weight: requiredNumber,
	lastDried: requiredString,
	openingDate: requiredString,
	producer: {
		_id: requiredString,
		producerName: requiredString,
		emptyWeight: requiredNumber,
		spoolSize: requiredNumber
	}
});

const collectionName = 'stock';

export const StockModel =
	mongoose.models.StockSchema ||
	mongoose.model<StockModelInterface>(collectionName, StockSchema, collectionName);
