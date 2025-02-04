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
