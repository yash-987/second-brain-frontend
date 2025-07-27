// API Configuration
export const API_CONFIG = {
	// Use environment variable if available, otherwise use production URL
	BASE_URL:
		import.meta.env.VITE_BACKEND_URL || 'https://brainly-olive.vercel.app',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
	return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export the backend URL for direct use
export const BACKEND_URL = API_CONFIG.BASE_URL;
