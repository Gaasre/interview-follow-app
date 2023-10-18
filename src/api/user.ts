import type { ApiResponse, User, ValidationError } from '$types/types';
import axiosClient from '$utils/axios-client';
import type { AxiosError } from 'axios';

export const login = async (email: string, password: string) => {
	try {
		const { data } = await axiosClient.post<ApiResponse<string>>('/user/login', {
			email,
			password
		});

		if (data) {
			const { data: token } = data;
			return token;
		}
	} catch (error) {
		const err = error as AxiosError<ApiResponse<ValidationError[]>>;
		return Promise.reject(err.response?.data.message);
	}
};

export const getSelf = async () => {
	try {
		const { data } = await axiosClient.get<ApiResponse<User>>('/user/self');
		return data.data;
	} catch (error) {
		const err = error as AxiosError<ApiResponse<string>>;
		return Promise.reject(err.response?.data.message);
	}
};
