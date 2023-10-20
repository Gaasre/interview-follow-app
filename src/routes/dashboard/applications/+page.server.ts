import {
	deleteApplication,
	editApplication,
	getAllApplications,
	newApplication
} from '$api/application';
import type { ApiResponse, ValidationError } from '$types/types';
import { fail } from '@sveltejs/kit';

export async function load({ url }: { url: URL }) {
	const sort = url.searchParams.get('sort') as string;
	return {
		applications: await getAllApplications(0, sort),
		sort
	};
}

export const actions = {
	new: async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const company = data.get('company') as string;
		const link = data.get('link') as string;
		const description = data.get('description') as string;

		if (!title) {
			return fail(400, { failed: true, message: 'Title field is empty' });
		}

		if (!company) {
			return fail(400, { failed: true, message: 'Company field is empty' });
		}

		if (!description) {
			return fail(400, { failed: true, message: 'Description field is empty' });
		}

		if (!link) {
			return fail(400, { failed: true, message: 'Link field is empty' });
		}

		try {
			await newApplication({
				title,
				company,
				description,
				link
			});

			return { success: true };
		} catch (err) {
			const error = err as ApiResponse<ValidationError[]>;
			return fail(400, { failed: true, message: error.message });
		}
	},
	edit: async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const title = data.get('title') as string;
		const company = data.get('company') as string;
		const link = data.get('link') as string;
		const description = data.get('description') as string;

		if (!title) {
			return fail(400, { failed: true, message: 'Title field is empty' });
		}

		if (!company) {
			return fail(400, { failed: true, message: 'Company field is empty' });
		}

		if (!description) {
			return fail(400, { failed: true, message: 'Description field is empty' });
		}

		if (!link) {
			return fail(400, { failed: true, message: 'Link field is empty' });
		}

		try {
			await editApplication(id, {
				title,
				company,
				description,
				link
			});

			return { success: true };
		} catch (err) {
			const error = err as ApiResponse<ValidationError[]>;
			return fail(400, { failed: true, message: error.message });
		}
	},
	delete: async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		try {
			await deleteApplication(id);
			return { success: true };
		} catch (err) {
			const error = err as ApiResponse<string>;
			return fail(400, { failed: true, message: error.message });
		}
	}
};
