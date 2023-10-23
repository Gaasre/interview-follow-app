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
	stage: string;
	link: string;
};

export type ApplicationRequest = {
	company: string;
	title: string;
	description: string;
	stage: string;
	link: string;
};

export type PaginatedResult<T> = {
	items: T[];
	page: number;
	size: number;
	max_page: number;
	total_pages: number;
	total: number;
	last: boolean;
	first: boolean;
	visible: number;
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
