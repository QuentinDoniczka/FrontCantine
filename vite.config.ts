import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: true,
	},
	esbuild: {
		sourcemap: true,
	},
	css: {
		devSourcemap: true,
	},
});
