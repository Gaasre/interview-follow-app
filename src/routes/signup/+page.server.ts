import { fail } from '@sveltejs/kit';
import type { ApiResponse, ValidationError } from '$types/types';
import { signup } from '$api/user';

export const actions = {
	default:  async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const passwordVerification = data.get('repassword');
		const name = data.get('name');

		if (!email) {
			return fail(400, { failed: true, message: 'Email field is empty' });
		}

		if (!password) {
			return fail(400, { failed: true, message: 'Password field is empty' });
		}

		if (password != passwordVerification) {
			return fail(400, { failed: true, message: 'The two passwords do not match' });
		}

		try {
			await signup({
				email: email as string,
				password: password as string,
				name: name as string
			});

			return { success: true };
		} catch (err) {
			const error = err as ApiResponse<ValidationError[]>;
			return fail(400, { failed: true, message: error.message });
		}
	},
};
