import mongoose from 'mongoose';

const requiredString = {
	type: String,
	required: true
};

const requiredNumber = {
	type: Number,
	required: true
};

const requiredDate = {
	type: Date,
	required: true
};

const EventsSchema = new mongoose.Schema({
	_id: requiredString,
	event_type: requiredString,
	timestamp: requiredDate,
	data: {
		type: Object
	},
	oldData: {
		type: Object
	},
	updatedData: {
		type: Object
	},
	filamentUsed: {
		type: Number
	}
});

const collectionName = 'events';

export const EventsModel =
	mongoose.models.EventsModel ||
	mongoose.model<EventsModelInterface>(collectionName, EventsSchema, collectionName);
