const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const ensureTrailingSlash = (value) => value.endsWith('/') ? value : `${value}/`;

export const API_BASE_URL = trimTrailingSlash(
  process.env.REACT_APP_API_URL || 'http://localhost:4000'
);

export const PUBLIC_FOLDER = ensureTrailingSlash(
  process.env.REACT_APP_PUBLIC_FOLDER || `${API_BASE_URL}/images`
);
