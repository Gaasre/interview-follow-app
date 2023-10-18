import type { ApiResponse, SignupRequest, User, ValidationError } from '$types/types';
import axiosClient from '$utils/axios-client';
import type { AxiosError } from 'axios';

export const getSelf = async () => {
	try {
		const { data } = await axiosClient.get<ApiResponse<User>>('/user/self');
		return data.data;
	} catch (error) {
		const err = error as AxiosError<ApiResponse<string>>;
		return Promise.reject(err.response?.data.message);
	}
};

export const signup = async ({ email, password, name }: SignupRequest) => {
	try {
		const { data } = await axiosClient.post<ApiResponse<string>>('/user/signup', {
			email,
			name,
			password
		});

		return data;
	} catch (error) {
		const err = error as AxiosError<ApiResponse<ValidationError[]>>;
		return Promise.reject(err.response?.data);
	}
};
