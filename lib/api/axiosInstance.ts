import axios from 'axios';

// Mock base URL for the hackathon demo if no real backend is provided
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sub-infrastructure.demo';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    // We'll store tokens in localStorage for the demo
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
        if (!refreshToken) throw new Error('No refresh token');

        // Call refresh endpoint
        const { data } = await axios.post(`${API_BASE_URL}/api/auth/token/refresh`, {
          refresh: refreshToken,
        });

        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', data.access);
          if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
        }

        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
