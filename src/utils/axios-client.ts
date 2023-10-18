import axios from 'axios';
import { get } from 'svelte/store';
import { sessionToken } from '../stores';

const axiosClient = axios.create({
	baseURL: 'http://127.0.0.1:1902/api'
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = get(sessionToken);
		if (token && config.headers) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		if (config.headers) {
			config.headers['Content-Type'] = 'application/json';
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
