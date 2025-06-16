<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user, session } from '$lib/stores/auth';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	$effect(() => {
		if (data.session) {
			session.set(data.session);
			user.set(data.session.user);
		} else {
			session.set(null);
			user.set(null);
		}
	});

	onMount(() => {
		const { data: { subscription } } = data.supabase.auth.onAuthStateChange(
			(event, newSession) => {
				if (newSession?.expires_at !== data.session?.expires_at) {
					invalidate('supabase:auth');
				}
			}
		);

		return () => subscription.unsubscribe();
	});
</script>

{@render children()}
