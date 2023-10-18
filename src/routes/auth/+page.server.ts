import axiosClient from '$utils/axios-client';
import { fail } from '@sveltejs/kit';
import type { ApiResponse, ValidationError } from '$types/types';
import type { AxiosError } from 'axios';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			const { data } = await axiosClient.post<ApiResponse<string>>('/user/login', {
				email,
				password
			});

			if (data) {
				const { data: token } = data;
				cookies.set('token', token, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7 // one week
				});
				return { success: true };
			}
		} catch (error) {
			const err = error as AxiosError<ApiResponse<ValidationError[]>>;
			return fail(400, { failed: true, message: err.response?.data.message });
		}
	}
};
