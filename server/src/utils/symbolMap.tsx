// symbolMap.ts
const symbolMap: { [key: string]: string } = {
    "%5EGSPC": "FOREXCOM:SPXUSD",  // S&P 500 with correct TradingView format
    "%5EDJI": "FOREXCOM:DJI",      // Dow Jones Industrial Average
    "^DJI": "FOREXCOM:DJI",        // Dow Jones Industrial Average alternative symbol
    "%5EIXIC": "NASDAQ:IXIC",      // Nasdaq Composite
    "AAPL": "NASDAQ:AAPL",         // Apple Inc.
    "MSFT": "NASDAQ:MSFT",         // Microsoft Corporation
  };
  
  export default symbolMap;