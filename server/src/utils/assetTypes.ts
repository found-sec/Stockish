export enum AssetType {
  STOCK = 'STOCK',
  INDEX = 'INDEX',
  ETF = 'ETF',
  FOREX = 'FOREX',
  MUTUAL_FUND = 'MUTUAL_FUND'
}

export const ENABLED_ASSET_TYPES = new Set([
  AssetType.STOCK,
  AssetType.INDEX,
  AssetType.ETF,
  AssetType.FOREX,
  AssetType.MUTUAL_FUND
]);

// crypto detection utils
export const CRYPTO_PATTERNS = [
  /-USD$/,  // BTC-USD, ETH-USD
  /-EUR$/,  // BTC-EUR
  /-JPY$/,  // BTC-JPY
  /-GBP$/,  // BTC-GBP
  /^BTC/,   // BTCUSD, BTC
  /^ETH/,   // ETHUSD, ETH
  /USDT$/,  // Common stablecoin pairs
  /^USDC/,  // USD Coin pairs
];

export const isCryptoSymbol = (symbol: string): boolean => {
  return CRYPTO_PATTERNS.some(pattern => pattern.test(symbol));
};
