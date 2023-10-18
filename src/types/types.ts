export type ApiResponse<T> = {
	status: 'success' | 'failed';
	message: string;
	data: T;
};

export type User = {
	id: string;
	name: string;
	email: string;
};

export type Application = {
	id: string;
	company: string;
	title: string;
	description: string;
};

export type ValidationError = {
	field: string;
	tag: string;
	value: string;
};

export type SignupRequest = {
	email: string;
	name: string;
	password: string;
};
