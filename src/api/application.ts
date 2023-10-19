import type {
	ApiResponse,
	Application,
	ApplicationRequest,
	PaginatedResult,
	ValidationError
} from '$types/types';
import axiosClient from '$utils/axios-client';
import type { AxiosError } from 'axios';

export const getAllApplications = async (page: number, sort: string) => {
	const { data } = await axiosClient.get<ApiResponse<PaginatedResult<Application>>>(
		`/application/all?page=${page}&sort=${sort}`
	);
	return data.data;
};

export const newApplication = async (application: ApplicationRequest) => {
	try {
		const { data } = await axiosClient.post<ApiResponse<Application>>(
			'/application/new',
			application
		);

		return data.data;
	} catch (error) {
		const err = error as AxiosError<ApiResponse<ValidationError[]>>;
		return Promise.reject(err.response?.data);
	}
};

export const editApplication = async (id: string, application: ApplicationRequest) => {
	try {
		const { data } = await axiosClient.put<ApiResponse<Application>>(
			`/application/edit/${id}`,
			application
		);

		return data.data;
	} catch (error) {
		const err = error as AxiosError<ApiResponse<ValidationError[]>>;
		return Promise.reject(err.response?.data);
	}
};

export const deleteApplication = async (id: string) => {
	try {
		const { data } = await axiosClient.delete<ApiResponse<string>>(`/application/delete/${id}`);
		return data.data;
	} catch (error) {
		const err = error as AxiosError<ApiResponse<string>>;
		return Promise.reject(err.response?.data);
	}
};
