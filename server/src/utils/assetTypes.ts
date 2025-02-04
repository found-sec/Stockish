export enum AssetType {
  EQUITY = 'EQUITY',
  INDEX = 'INDEX',
  ETF = 'ETF',
  MUTUAL_FUND = 'MUTUAL_FUND'
}

export const ENABLED_ASSET_TYPES = new Set([
  AssetType.EQUITY,
  AssetType.INDEX,
  AssetType.ETF,
  AssetType.MUTUAL_FUND
]);


export const EXCLUDED_QUOTE_TYPES = new Set([
  'CRYPTOCURRENCY',
  'CRYPTO',
  'CURRENCY',
  'FUTURE',
  'FUTURES'
]);

export const CRYPTO_PATTERNS = [
  /-USD$/i,
  /-EUR$/i,
  /-JPY$/i,
  /-GBP$/i,
  /^BTC-/i,
  /^ETH-/i,
  /^XRP-/i,
  /^DOGE-/i,
  /^ADA-/i,
  /USDT$/i,
  /^USDC/i,
  /BUSD$/i,
  /USDD$/i
];

export const isCryptoSymbol = (symbol: string): boolean => {
  if (!symbol) return false;
  const upperSymbol = symbol.toUpperCase();
  return CRYPTO_PATTERNS.some(pattern => pattern.test(upperSymbol));
};
