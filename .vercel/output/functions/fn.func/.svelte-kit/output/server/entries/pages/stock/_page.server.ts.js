import "mongoose";
import { e as error } from "../../../chunks/index.js";
import "../../../chunks/Stock.js";
const load = async ({ url, fetch }) => {
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;
  async function getStockItems(limit2, skip2) {
    if (limit2 > 100) {
      throw error(400, "Bad Request");
    }
    const res = await fetch(`/api/stock?limit=${limit2}&skip=${skip2}`);
    const data = await res.json();
    return data;
  }
  return {
    stockItems: getStockItems(limit, skip)
  };
};
export {
  load
};
