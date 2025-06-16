import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key: string) {
				if (!isBrowser()) {
					return data?.session ? JSON.stringify(data.session) : undefined;
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			},
			set(key: string, value: string, options: any) {
				if (isBrowser()) {
					document.cookie = `${key}=${value}; path=/; ${options?.maxAge ? `max-age=${options.maxAge};` : ''}`;
				}
			},
			remove(key: string, options: any) {
				if (isBrowser()) {
					document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
				}
			}
		}
	});

	const { data: { session } } = await supabase.auth.getSession();

	return {
		supabase,
		session
	};
};