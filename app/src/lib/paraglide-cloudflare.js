// Cloudflare-compatible wrapper for Paraglide middleware
import { paraglideMiddleware } from './paraglide/server.js';

// Mock AsyncLocalStorage for Cloudflare Workers
class MockAsyncLocalStorage {
	#store;

	getStore() {
		return this.#store;
	}

	run(store, callback) {
		this.#store = store;
		try {
			return callback();
		} finally {
			this.#store = undefined;
		}
	}
}

// Override the global AsyncLocalStorage import for Cloudflare
if (typeof globalThis !== 'undefined' && !globalThis.AsyncLocalStorage) {
	globalThis.AsyncLocalStorage = MockAsyncLocalStorage;
}

export { paraglideMiddleware };