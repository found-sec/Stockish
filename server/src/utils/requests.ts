import yahooFinance from "yahoo-finance2";
import Cache from "node-cache";
import axios from "axios";
const stockCache = new Cache({ stdTTL: 30 }); // 30 secs

import dotenv from "dotenv";
dotenv.config();

interface CachedStockData { // just for more type safety
  timestamp: number;
  data: {
    symbol: string;
    longName: string;
    regularMarketPrice: number;
    regularMarketPreviousClose: number;
    regularMarketChangePercent: number;
    quoteType: string;
  }
}

export const fetchStockData = async (symbol: string): Promise<any> => {
  const isCrypto = symbol.startsWith('CRYPTO:') || symbol.includes('-USD');
  const cacheKey = `${isCrypto ? 'crypto' : 'stock'}-${symbol}-quote`;
  
  // Clear existing cache for this specific symbol
  if (stockCache.has(cacheKey)) {
    stockCache.del(cacheKey);
  }

  try {
    const quote = isCrypto ? 
      await yahooFinance.quoteCombine(symbol, {
        fields: ["regularMarketPrice", "regularMarketChangePercent", "longName"],
      }) :
      await yahooFinance.quoteCombine(symbol, {
        fields: [
          "regularMarketPrice",
          "regularMarketChangePercent",
          "longName",
          "regularMarketPreviousClose"
        ]
      });

    const stockData = {
      symbol,
      longName: quote.longName,
      regularMarketPrice: quote.regularMarketPrice,
      regularMarketPreviousClose: quote.regularMarketPreviousClose,
      regularMarketChangePercent: quote.regularMarketChangePercent,
      assetType: isCrypto ? 'crypto' : 'stock'
    };

    stockCache.set(cacheKey, stockData, isCrypto ? 30 : 60);
    return stockData;
  } catch (err) {
    console.error(`Error fetching data for ${symbol}:`, err);
    throw err;
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
