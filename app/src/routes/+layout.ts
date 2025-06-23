import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key: string) {
				if (!isBrowser()) {
					// Return undefined for SSR, let Supabase handle cookie parsing from headers
					return undefined;
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			},
			set(key: string, value: string, options: { maxAge?: number } = {}) {
				if (isBrowser()) {
					const secureFlags = 'SameSite=Lax; Secure';
					const maxAge = options?.maxAge ? `max-age=${options.maxAge};` : '';
					document.cookie = `${key}=${value}; path=/; ${maxAge} ${secureFlags}`;
				}
			},
			remove(key: string) {
				if (isBrowser()) {
					document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
				}
			}
		}
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return {
		supabase,
		session
	};
};
