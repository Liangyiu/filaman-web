import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';
/*
    0 - disconnected
    1 - connected
    2 - connecting
    3 - disconnecting
    4 - uninitialized
*/

const mongoDbConnection = {
	isConnected: 0
};

export async function dbConnect() {
	if (mongoDbConnection.isConnected === 1) {
		if (env.NODE_ENV === 'development') {
			console.log('Database already connected');
		}
		return;
	}

	if (mongoose.connections.length > 0) {
		mongoDbConnection.isConnected = mongoose.connections[0].readyState;
		if (mongoDbConnection.isConnected === 1) {
			if (env.NODE_ENV === 'development') {
				console.log('using existing database connection');
			}
			return;
		}

		await mongoose.disconnect();
	}

	await mongoose.connect(env.MONGO_CON_STRING ?? '');
	mongoDbConnection.isConnected = 1;
	if (env.NODE_ENV === 'development') {
		console.log('Connected to MongoDB');
	}
}

export async function dbDisconnect() {
	if (env.NODE_ENV === 'development') return;
	if (mongoDbConnection.isConnected === 0) return;

	await mongoose.disconnect();
	mongoDbConnection.isConnected = 0;
	if (env.NODE_ENV === 'development') {
		console.log('Closed database connection');
	}
}
