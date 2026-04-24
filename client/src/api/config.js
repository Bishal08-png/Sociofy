const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const ensureTrailingSlash = (value) => value.endsWith('/') ? value : `${value}/`;

export const API_BASE_URL = trimTrailingSlash(
  process.env.REACT_APP_API_URL || 'http://localhost:4000'
);

export const PUBLIC_FOLDER = ensureTrailingSlash(
  process.env.REACT_APP_PUBLIC_FOLDER || `${API_BASE_URL}/images`
);

/**
 * Resolves an image value to a displayable URL.
 * - If the value is already a full URL (http/https), returns it as-is (Cloudinary or any CDN).
 * - If it's a bare filename (legacy local storage), prepends PUBLIC_FOLDER.
 * - Falls back to the provided defaultFile (served from PUBLIC_FOLDER).
 */
export const resolveImageUrl = (value, defaultFile = 'defaultProfile.png') => {
  if (!value) return PUBLIC_FOLDER + defaultFile;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return PUBLIC_FOLDER + value;
};
