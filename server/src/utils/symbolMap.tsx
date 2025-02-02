// symbolMap.ts
const symbolMap: { [key: string]: string } = {
    "%5EGSPC": "FOREXCOM:SPXUSD",  // S&P 500 with correct TradingView format
    "%5EDJI": "FOREXCOM:DJI",      // Dow Jones Industrial Average
    "^DJI": "FOREXCOM:DJI",        // Dow Jones Industrial Average alt symbol
    "%5EIXIC": "NASDAQ:IXIC",      // Nasdaq
    "AAPL": "NASDAQ:AAPL",         // Apple
    "MSFT": "NASDAQ:MSFT",         // Microsoft
    "BTC-USD": "CRYPTO:BTCUSD",    // Bitcoin
    "ETH-USD": "CRYPTO:ETHUSD",    // Ethereum
  };
  
  export default symbolMap;