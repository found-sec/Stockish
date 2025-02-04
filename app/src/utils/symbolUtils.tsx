import symbolMap from "../../../server/src/utils/symbolMap";

export const getFormattedSymbol = (symbol: string): string => {
  const mappings: { [key: string]: string } = {
    // US Indices
    "%5EGSPC": "FOREXCOM:SPXUSD", // S&P 500
    "^GSPC": "FOREXCOM:SPXUSD",
    "^DJI": "FOREXCOM:DJI",      // Dow Jones
    "^IXIC": "NASDAQ:IXIC",      // NASDAQ Composite
    "^RUT": "FOREXCOM:RUSUSD",   // Russell 2000
    "^VIX": "TVC:VIX",           // Volatility Index

    // US Treasury Yields
    "^TNX": "TVC:TNX",           // 10-Year Treasury Yield
    "^TYX": "TVC:US10Y",         // 30-Year Treasury Yield
    "^FVX": "TVC:US05Y",         // 5-Year Treasury Yield
    "^IRX": "TVC:US02Y",         // 2-Year Treasury Yield

    // International Indices
    "^FTSE": "FOREXCOM:UKXGBP",  // FTSE 100
    "^N225": "TVC:NI225",        // Nikkei 225
    "^HSI": "HSI",               // Hang Seng Index
    "^GDAXI": "FOREXCOM:GRXEUR", // German DAX
    "^FCHI": "EURONEXT:PX1",     // French CAC 40
    
    // Australian Securities (.AX)
    "DTL.AX": "ASX:DTL",
    "BHP.AX": "ASX:BHP",
    "CBA.AX": "ASX:CBA",
    "WBC.AX": "ASX:WBC",
    "NAB.AX": "ASX:NAB",
    "ANZ.AX": "ASX:ANZ",
    
    // London Stock Exchange (.L)
    "EUA.L": "LSE:EUA",
    "SUP.L": "LSE:SUP",
    "HSBA.L": "LSE:HSBA",
    "LLOY.L": "LSE:LLOY",
    "BARC.L": "LSE:BARC",
    "RIO.L": "LSE:RIO",
    "BP.L": "LSE:BP",
    
    // Toronto Stock Exchange (.TO)
    "RY.TO": "TSX:RY",
    "TD.TO": "TSX:TD",
    "ENB.TO": "TSX:ENB",
    
    // European Exchanges
    "AIR.PA": "EURONEXT:AIR",    // Paris
    "ALV.DE": "XETR:ALV",        // Frankfurt
    "ISP.MI": "MIL:ISP"          // Milan
  };

  const decodedSymbol = decodeURIComponent(symbol);
  return mappings[decodedSymbol] || symbolMap[decodedSymbol] || decodedSymbol;
};
