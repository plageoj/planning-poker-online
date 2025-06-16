export default {
	// Disable AsyncLocalStorage for Cloudflare Workers compatibility
	disableAsyncLocalStorage: true,
	
	// Other configuration options
	outputDirectory: './src/lib/paraglide',
	baseLocale: 'en',
	locales: ['en', 'ja', 'vi']
};