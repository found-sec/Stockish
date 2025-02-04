// symbolMap.ts
const symbolMap: { [key: string]: string } = {
  // US Major Indices
  "%5EGSPC": "FOREXCOM:SPXUSD",  // S&P 500
  "%5EDJI": "FOREXCOM:DJI",      // Dow Jones
  "^DJI": "FOREXCOM:DJI",        
  "%5EIXIC": "NASDAQ:IXIC",      // Nasdaq
  "%5ERUT": "FOREXCOM:RUSUSD",   // Russell 2000
  "%5EVIX": "TVC:VIX",           // Volatility Index

  // US Large Cap Tech
  "AAPL": "NASDAQ:AAPL",         // Apple
  "MSFT": "NASDAQ:MSFT",         // Microsoft
  "GOOGL": "NASDAQ:GOOGL",       // Alphabet
  "AMZN": "NASDAQ:AMZN",         // Amazon
  "META": "NASDAQ:META",         // Meta
  "NVDA": "NASDAQ:NVDA",         // NVIDIA
  "TSLA": "NASDAQ:TSLA",         // Tesla

  // US Financial
  "JPM": "NYSE:JPM",             // JPMorgan
  "BAC": "NYSE:BAC",             // Bank of America
  "WFC": "NYSE:WFC",             // Wells Fargo
  "GS": "NYSE:GS",               // Goldman Sachs
  "MS": "NYSE:MS",               // Morgan Stanley

  // US Industrial & Retail
  "WMT": "NYSE:WMT",             // Walmart
  "HD": "NYSE:HD",               // Home Depot
  "CAT": "NYSE:CAT",             // Caterpillar
  "BA": "NYSE:BA",               // Boeing
  "GE": "NYSE:GE",               // General Electric

  // European Blue Chips
  "SIE.DE": "XETR:SIE",         // Siemens
  "ASML.AS": "EURONEXT:ASML",   // ASML
  "SAP.DE": "XETR:SAP",         // SAP
  "AIR.PA": "EURONEXT:AIR",     // Airbus

  // Asian Markets
  "7203.T": "TSE:7203",         // Toyota
  "9984.T": "TSE:9984",         // SoftBank
  "005930.KS": "KRX:005930",    // Samsung
  "0700.HK": "HKEX:0700",       // Tencent
  "9988.HK": "HKEX:9988",       // Alibaba

  // Market ETFs
  "SPY": "AMEX:SPY",            // S&P 500 ETF
  "QQQ": "NASDAQ:QQQ",          // Nasdaq 100 ETF
  "DIA": "AMEX:DIA",            // Dow Jones ETF
  "IWM": "AMEX:IWM",            // Russell 2000 ETF
  "VGK": "AMEX:VGK",            // European Stocks ETF
  "EWJ": "AMEX:EWJ",            // Japanese Stocks ETF
};

export default symbolMap;