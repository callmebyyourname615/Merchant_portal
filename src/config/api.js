const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');

export const API_BASES = {
  base1: trimTrailingSlash(import.meta.env.VITE_API_BASE_1 || 'http://175.11.0.122:5000'),
  base2: trimTrailingSlash(import.meta.env.VITE_API_BASE_2 || 'http://175.11.0.122:3001'),
};

export const DEFAULT_API_BASE_KEY = 'base2';

export const getApiBase = (baseKey = DEFAULT_API_BASE_KEY) => {
  return API_BASES[baseKey] || API_BASES[DEFAULT_API_BASE_KEY];
};

export const buildApiUrl = (path = '', baseKey = DEFAULT_API_BASE_KEY) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBase(baseKey)}${normalizedPath}`;
};
