import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('click me button should be visible and interactive', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'click me' })).toBeVisible();
    await page.getByRole('button', { name: 'click me' }).click();
});

test('boot overlay should disappear after click', async ({ page }) => {
    await page.getByRole('button', { name: 'click me' }).click();
    await expect(page.locator('.boot-overlay')).toBeHidden();
});

test('hero section should activate after boot animation', async ({ page }) => {
    await page.getByRole('button', { name: 'click me' }).click();
    await expect(page.locator('.hero.is-active')).toBeVisible();
});

test('brand letters should be visible after animation', async ({ page }) => {
    await page.getByRole('button', { name: 'click me' }).click();
    await expect(page.locator('.hero.is-active')).toBeVisible();
    const letters = page.locator('.brand-letter');
    await expect(letters.first()).toBeVisible();
    await expect(letters).toHaveCount(6); // r-s-a-k-h-v
});

test('scroll to about me section', async ({ page }) => {
    await page.getByRole('button', { name: 'click me' }).click();
    await expect(page.locator('.hero.is-active')).toBeVisible();
    await page.locator('.scroll-cta').click();
    await expect(page.locator('#about')).toBeVisible();
})

test('validate about me section', async ({ page }) => {
    await page.getByRole('button', { name: 'click me' }).click();
    await expect(page.locator('.hero.is-active')).toBeVisible();
    await page.locator('.scroll-cta').click();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('.about-title')).toBeVisible();
    await expect(page.locator('.about-description')).toBeVisible();
    await expect(page.locator('.about-image')).toBeVisible();
})


