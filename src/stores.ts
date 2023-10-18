import type { User } from '$types/types';
import { writable, type Writable } from 'svelte/store';

export const userSession = <Writable<User>>writable();
export const sessionToken = <Writable<string>>writable('');
