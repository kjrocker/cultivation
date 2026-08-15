import { expect, test, type Page } from '@playwright/test';

// The app is served under svelte.config.js's `paths.base`.
const APP = '/cultivation';

const bodyPart = (page: Page, name: string) => page.locator('li').filter({ hasText: name });

// The slide-over's outermost element has a zero-size box, so assert on its
// heading rather than on the dialog itself.
const openPanel = async (page: Page, button: string, title: string) => {
	await page.getByRole('button', { name: button, exact: true }).click();
	const panel = page.getByRole('dialog');
	await expect(panel.getByRole('heading', { name: title })).toBeVisible();
	return panel;
};

const closePanel = async (page: Page) => {
	await page.getByRole('dialog').getByRole('button', { name: 'Close panel' }).click();
	await expect(page.getByRole('dialog')).toHaveCount(0);
};

// +layout.svelte renders "Loading..." until all six data stores have fetched their
// JSON from static/Data, so every test waits for the planner itself to appear.
const gotoApp = async (page: Page) => {
	await page.goto(APP);
	await expect(page.locator('select[name="species"]')).toBeVisible();
};

test('loads the planner once the game data resolves', async ({ page }) => {
	await gotoApp(page);

	await expect(page.locator('select[name="species"]')).toHaveValue('human');
	await expect(page.locator('select[name="law"]')).toHaveValue('Body_Gong_1');

	// Body parts come from static/Data/BodyParts.json, secret bodies from the law.
	await expect(bodyPart(page, 'Left Thumb')).toBeVisible();
	await expect(page.getByText('Dark Turtle Shell')).toBeVisible();
});

test('switching species swaps the body part list', async ({ page }) => {
	await gotoApp(page);

	await page.locator('select[name="species"]').selectOption('turtle');

	await expect(bodyPart(page, 'Carapace')).toBeVisible();
	await expect(bodyPart(page, 'Left Thumb')).toHaveCount(0);
});

test('switching law swaps the secret bodies and unlocks its tempering option', async ({ page }) => {
	await gotoApp(page);

	await expect(page.locator('input[name="fireSpine"]')).toBeDisabled();

	await page.locator('select[name="law"]').selectOption('Body_Gong_2');

	await expect(page.getByText('Barbarian God Heart')).toBeVisible();
	await expect(page.getByText('Dark Turtle Shell')).toHaveCount(0);
	// Firestruck Spine only exists under the Barbarous Forging Body law.
	await expect(page.locator('input[name="fireSpine"]')).toBeEnabled();
	await expect(page.locator('input[name="transcendantHeart"]')).toBeDisabled();
});

test('a cultivator round-trips through backup and restore', async ({ page }) => {
	await gotoApp(page);

	await page.locator('input[name="name"]').fill('Iron Turtle');
	await page.locator('select[name="species"]').selectOption('turtle');
	await expect(bodyPart(page, 'Carapace')).toBeVisible();

	const backup = await openPanel(page, 'Backup', 'Backup Cultivator');
	const code = await backup.locator('textarea[name="cultivator"]').inputValue();
	await closePanel(page);

	// The backup is base64 of a MinifiedOptionsV2 blob whose values are indices
	// into the DataView key lists, so assert the encoded shape as well.
	const build = JSON.parse(Buffer.from(code, 'base64').toString());
	expect(build.v).toBe(2);
	expect(build.o.n).toBe('Iron Turtle');
	expect(build.o.sp).toBe('turtle');

	// Wipe the build so the restore has something to actually change.
	await page.locator('input[name="name"]').fill('');
	await page.locator('select[name="species"]').selectOption('human');
	await expect(bodyPart(page, 'Left Thumb')).toBeVisible();

	const restore = await openPanel(page, 'Restore', 'Restore Cultivator');
	await restore.locator('textarea[name="cultivator"]').fill(code);
	await restore.getByRole('button', { name: 'Load Cultivator' }).click();
	await closePanel(page);

	await expect(page.locator('input[name="name"]')).toHaveValue('Iron Turtle');
	await expect(page.locator('select[name="species"]')).toHaveValue('turtle');
	await expect(bodyPart(page, 'Carapace')).toBeVisible();
});
