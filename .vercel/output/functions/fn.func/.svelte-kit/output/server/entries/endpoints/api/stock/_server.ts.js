import { S as StockModel } from "../../../../chunks/Stock.js";
import mongoose from "mongoose";
import { j as json, e as error } from "../../../../chunks/index.js";
const MONGO_CON_STRING = "mongodb+srv://filament-manager:FilamentManagement55768@cluster0.b7w7f74.mongodb.net/filament-management?retryWrites=true&w=majority";
const mongoDbConnection = {
  isConnected: 0
};
async function dbConnect() {
  if (mongoDbConnection.isConnected === 1) {
    console.log("Database already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    mongoDbConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoDbConnection.isConnected === 1) {
      console.log("using existing database connection");
      return;
    }
    await mongoose.disconnect();
  }
  await mongoose.connect(MONGO_CON_STRING);
  mongoDbConnection.isConnected = 1;
  console.log("Connected to MongoDB");
}
async function dbDisconnect() {
  if (process.env.NODE_ENV === "development")
    return;
  if (mongoDbConnection.isConnected === 0)
    return;
  await mongoose.disconnect();
  mongoDbConnection.isConnected = 0;
  console.log("Closed database connection");
}
const GET = async ({ url }) => {
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;
  async function getStockItems(limit2 = 10, skip2 = 0) {
    if (limit2 > 100) {
      throw error(400, "Bad Request");
    }
    await dbConnect();
    const stockItems = await StockModel.find().limit(limit2).skip(skip2);
    const count = await StockModel.count();
    await dbDisconnect();
    const response = {
      stockItems,
      total: count,
      limit: limit2,
      skip: skip2
    };
    return JSON.parse(JSON.stringify(response));
  }
  return json(await getStockItems(limit, skip));
};
export {
  GET
};
