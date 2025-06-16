import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const SUPABASE_URL = env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_ANON_KEY) {
	console.warn('Supabase environment variables not configured. Authentication will not work.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
