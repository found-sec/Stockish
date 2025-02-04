import yahooFinance from "yahoo-finance2";
import Cache from "node-cache";
import axios from "axios";
const stockCache = new Cache({ stdTTL: 60 }); // 1 minute

import dotenv from "dotenv";
dotenv.config();

import { isCryptoSymbol } from './assetTypes';

export const fetchStockData = async (symbol: string): Promise<any> => {
  // Reject crypto symbols immediately
  if (isCryptoSymbol(symbol)) {
    throw new Error('Cryptocurrency trading is not supported');
  }

  const cacheKey = `stock-${symbol}-quote`;
  
  if (stockCache.has(cacheKey)) {
    stockCache.del(cacheKey);
  }

  try {
    const quote = await yahooFinance.quoteCombine(symbol, {
      fields: [
        "regularMarketPrice",
        "regularMarketChangePercent", 
        "longName",
        "regularMarketPreviousClose",
        "quoteType" // check if it's a stock
      ]
    });

    // Reject if not a stock
    if (quote.quoteType !== 'EQUITY') {
      throw new Error('Only stock trading is supported');
    }

    const stockData = {
      symbol,
      longName: quote.longName,
      regularMarketPrice: Number(quote.regularMarketPrice),
      regularMarketPreviousClose: Number(quote.regularMarketPreviousClose),
      regularMarketChangePercent: Number(quote.regularMarketChangePercent),
      assetType: 'stock'
    };

    stockCache.set(cacheKey, stockData, 60);
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

      return results.quotes.filter(quote => 
        'symbol' in quote && 
        !isCryptoSymbol(quote.symbol) && 
        quote.quoteType !== 'CRYPTOCURRENCY'
      );
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