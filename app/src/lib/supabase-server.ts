import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import type { Handle } from '@sveltejs/kit';

export const supabaseServerClient: Handle = async ({ event, resolve }) => {
	const SUPABASE_URL = env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
	const SUPABASE_ANON_KEY = env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

	if (!env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_ANON_KEY) {
		console.warn('Supabase environment variables not configured. Authentication will not work.');
	}

	event.locals.supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
	});

	event.locals.getSession = async () => {
		try {
			const {
				data: { session }
			} = await event.locals.supabase.auth.getSession();
			return session;
		} catch (error) {
			console.error('Failed to get session:', error);
			return null;
		}
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
