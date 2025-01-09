import yahooFinance from "yahoo-finance2";
import Cache from "node-cache";
import axios from "axios";
const stockCache = new Cache({ stdTTL: 60 }); // 1 minute

import dotenv from "dotenv";
dotenv.config();

export const fetchStockData = async (symbol: string): Promise<any> => {
	const cacheKey = symbol + "-quote";

	try {
		if (stockCache.has(cacheKey)) {
			return stockCache.get(cacheKey);
		} else {
			const quote = await yahooFinance.quoteCombine(symbol, {
				fields: [
					"regularMarketPrice",
					"regularMarketChangePercent",
					"longName",
					"regularMarketPreviousClose",
				],
			});

			const {
				regularMarketPrice,
				regularMarketChangePercent,
				longName,
				regularMarketPreviousClose,
			} = quote;

			const stockData = {
				symbol,
				longName,
				regularMarketPrice,
				regularMarketPreviousClose,
				regularMarketChangePercent,
			};

			stockCache.set(cacheKey, stockData);
			return stockData;
		}
	} catch (err: any) {
		if (err.result && Array.isArray(err.result)) {
			let quote = err.result[0];

			const {
				regularMarketPrice,
				regularMarketChangePercent,
				longName,
				regularMarketPreviousClose,
			} = quote;

			const stockData = {
				symbol,
				longName,
				regularMarketPrice,
				regularMarketPreviousClose,
				regularMarketChangePercent,
			};

			stockCache.set(cacheKey, stockData);
			return stockData;
		} else {
			console.error(err);
			console.error("Error fetching " + symbol + " stock data:", err);
			throw new Error(err);
		}
	}
};



export const searchStocks = async (query: string): Promise<any> => {
	const queryOptions = {
		newsCount: 0,
		enableFuzzyQuery: true,
		enableNavLinks: false,
		enableCb: false,
		enableEnhancedTrivialQuery: false,
	};

	return yahooFinance
		.search(query, queryOptions)
		.then((results) => {
			return results.quotes;
		})
		.catch((err) => {
			if (err.result && Array.isArray(err.result.quotes)) {
				return err.result.quotes;
			} else {
				console.error(err);
				throw new Error(err);
			}
		});
};
