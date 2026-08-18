const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

/**
 * Standard fetch wrapper that automatically includes credentials (cookies)
 * and parses JSON responses.
 */
async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    credentials: 'include', // Ensures cookies (like our jwtToken) are sent
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, finalOptions);
  
  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `API request failed with status ${response.status}`);
  }

  return data;
}

export const productApi = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.search) query.append('search', params.search);
    if (params.expiryWithinMonths) query.append('expiryWithinMonths', params.expiryWithinMonths);
    
    const queryString = query.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return fetchWithAuth(endpoint);
  },

  addProduct: (productData) => {
    return fetchWithAuth('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: (productId, productData) => {
    return fetchWithAuth(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: (productId) => {
    return fetchWithAuth(`/products/${productId}`, {
      method: 'DELETE',
    });
  }
};
