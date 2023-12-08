import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	plugins: [
		nodePolyfills({
			exclude: ["fs"],
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
			protocolImports: true,
		}),
		sveltekit(),
	],
	build: {
		chunkSizeWarningLimit: 2000,
	},
	optimizeDeps: {
		include: [
			"dayjs/plugin/relativeTime.js",
			"dayjs",
			"@web3auth/ethereum-provider",
			"@web3auth/modal"  // Include '@web3auth/modal' in optimizeDeps
		],
	},
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
