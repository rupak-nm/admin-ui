const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://api.neptunemutual.net';

export const LIQUIDITY_CYCLES_URL = `${API_BASE}/protocol/withdrawal-period`;

export const getCoversAndProductsUrl = (chainId: SUPPORTED_CHAIN_TYPE) =>
  `${API_BASE}/home/product-summary/${chainId}`;

export const ROWS_PER_PAGE = 100;

export const GAS_MARGIN_MULTIPLIER = 1.5;

export const DEFAULT_GAS_LIMIT = '6000000';

export const CONNECTOR_KEY = 'wallet_connected';
