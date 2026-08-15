import type { PlaywrightTestConfig } from '@playwright/test';

const PORT = 4173;

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'yarn build && yarn preview',
		port: PORT,
		reuseExistingServer: !process.env.CI
	},
	use: { baseURL: `http://localhost:${PORT}` },
	testDir: 'tests'
};

export default config;
