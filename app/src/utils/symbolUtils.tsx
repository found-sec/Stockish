import symbolMap from "../../../server/src/utils/symbolMap";

export const getFormattedSymbol = (symbol: string): string => {
  if (symbol === "%5EGSPC" || symbol === "^GSPC") {
    return "FOREXCOM:SPXUSD";
  }
  if (symbol === "^DJI") {
    return "FOREXCOM:DJI";
  }
  const decodedSymbol = decodeURIComponent(symbol);
  return symbolMap[decodedSymbol] || decodedSymbol;
};
 