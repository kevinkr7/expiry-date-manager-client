const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

/**
 * Core fetch wrapper — always sends/receives JSON, includes cookies.
 * @param {string} path - API path (e.g. '/auth/login')
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // Normalise backend error shapes: { message } or { errors: [...] }
    const message =
      data?.message ||
      data?.errors?.[0]?.msg ||
      'Something went wrong. Please try again.';
    const error = new Error(message);
    error.status = response.status;  // expose HTTP status for caller
    throw error;
  }

  return data;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authApi = {
  /**
   * Login with email + password. JWT is set as HTTP-only cookie by server.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ message: string, user: object }>}
   */
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  /**
   * Register a new user.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ message: string, user: object }>}
   */
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  /**
   * Log out the current user. Instructs the server to clear the HTTP-only
   * jwtToken cookie. No body required.
   * @returns {Promise<{ message: string }>}
   */
  logout: () =>
    request('/auth/logout', {
      method: 'POST',
    }),
};
