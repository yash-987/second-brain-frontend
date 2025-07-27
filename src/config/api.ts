// API Configuration
export const API_CONFIG = {
	// Use environment variable if available, otherwise use a default
	BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
	return `${API_CONFIG.BASE_URL}${endpoint}`;
};
