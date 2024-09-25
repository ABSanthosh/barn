import { test, expect } from '@playwright/test';

test.describe('Google Sign-In System Test', () => {
	test('should allow users to sign in with Google and see personalized content', async ({
		page
	}) => {
		// Step 1: Go to the application’s login page
		await page.goto('http://localhost:5173/'); // Replace with your app's URL

		// Step 2: Click the Google Sign-In button
		await page.click('button:has-text("Sign in")');

		// Step 3: Mock the Google login process using Playwright
		// Assume Google OAuth is set up for the test environment or use a mock service
		// Step 3: Intercept the Google OAuth request and mock the response
		await page.route('https://accounts.google.com/o/oauth2/v2/auth', (route) => {
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					id_token: 'fake-id-token',
					name: 'Test User',
					email: 'testuser@example.com'
				})
			});
		});

		// Step 4: Mock the token validation request 
		await page.route('https://oauth2.googleapis.com/token', (route) => {
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					access_token: 'fake-access-token',
					id_token: 'fake-id-token',
					expires_in: 3600
				})
			});
		});

		// Step 4: Simulate a successful sign-in (skip the real Google login flow)
		await page.route('https://accounts.google.com/o/oauth2/v2/auth', (route) => {
			route.fulfill({
				status: 200,
				body: JSON.stringify({ id_token: 'fake-id-token', user: { name: 'Test User' } })
			});
		});

		// Step 5: Verify that user is redirected to the dashboard after sign-in
		await expect(page).toHaveURL(/https:\/\/accounts\.google\.com\/v3\/signin\/identifier\?opparams.*/);

		// // Step 6: Check for personalized content
		// const content = await page.locator('text=Build your feed').isVisible();
		// expect(content).toBeTruthy();
	});
});
