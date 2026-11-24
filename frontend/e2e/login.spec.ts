import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
  test('should show login form', async ({ page }) => {
    // 需要等待 umi 编译完成
    test.setTimeout(60_000);
    await page.goto('/user/login');

    await expect(page.locator('.ant-pro-form-login-title')).toHaveText(
      'MT5 中控台',
      { timeout: 30_000 },
    );
    await expect(page.locator('.ant-pro-form-login-desc')).toHaveText(
      'MT5 多终端监控 · 只读',
    );
  });

  test('should login success', async ({ page }) => {
    await page.goto('/user/login');

    await page.getByPlaceholder('用户名').fill('admin');
    await page.getByPlaceholder('密码').fill('ant.design');
    await page.getByRole('button', { name: '登录' }).click();

    // mock 登录有约 2s 延迟，登录后跳转到总览页
    await expect(page.getByText('总览')).toBeVisible({
      timeout: 10000,
    });
  });
});
