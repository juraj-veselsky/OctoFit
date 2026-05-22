const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload?.results) {
    return payload.results;
  }

  if (payload?.data) {
    return payload.data;
  }

  if (payload?.items) {
    return payload.items;
  }

  return [];
};
