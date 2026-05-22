import { test, expect } from '@playwright/test';

test.describe('CV Page Feature Updates', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the CV page
    await page.goto('http://localhost:3007/cv');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display profile photo in header', async ({ page }) => {
    // Check that the profile photo is visible
    const profilePhoto = page.locator('img[alt="Gabriela De Sousa"]');
    await expect(profilePhoto).toBeVisible();

    // Check that it has the correct dimensions and styling
    const boundingBox = await profilePhoto.boundingBox();
    expect(boundingBox).not.toBeNull();

    // Verify it's circular (width should equal height)
    if (boundingBox) {
      expect(Math.abs(boundingBox.width - boundingBox.height)).toBeLessThan(10);
    }
  });

  test('should display new experience entries', async ({ page }) => {
    // Check for new professional experiences added
    const newExperiences = [
      'Creadora de Contenido Audiovisual',
      'Directora',
      'Productora Ejecutiva y Productora General',
      'Asistente de Dirección',
      'Productora General',
    ];

    for (const experience of newExperiences) {
      const element = page.locator(`text=${experience}`);
      await expect(element).toBeVisible();
    }
  });

  test('should display new experience details', async ({ page }) => {
    // Check for specific details from the new experiences
    const details = [
      'Academia BT&C / CIAP UCAB',
      'Guardianes Invisibles: Tiburones en Venezuela',
      'Guardia Baja',
      'Curda24',
    ];

    for (const detail of details) {
      const element = page.locator(`text=${detail}`);
      await expect(element).toBeVisible();
    }
  });

  test('should display new skills sections', async ({ page }) => {
    // Check that new skill categories are visible
    const skillCategories = [
      'Audiovisual',
      'Corporativo y Digital',
      'Software e IA',
    ];

    for (const category of skillCategories) {
      const element = page.locator(`text=${category}`);
      await expect(element).toBeVisible();
    }
  });

  test('should display audiovisual skills', async ({ page }) => {
    // Check for specific audiovisual skills
    const audiovisualSkills = [
      'Preproducción',
      'Producción general',
      'Dirección general',
      'Planificación de rodaje',
      'Grabación',
      'Edición de video',
    ];

    for (const skill of audiovisualSkills) {
      const element = page.locator(`text=${skill}`);
      await expect(element).toBeVisible();
    }
  });

  test('should display software and AI tools', async ({ page }) => {
    // Check for software and AI tools
    const softwareTools = [
      'Adobe Premiere',
      'CapCut',
      'ChatGPT',
      'Claude',
      'Adobe Firefly',
    ];

    for (const tool of softwareTools) {
      const element = page.locator(`text=${tool}`);
      await expect(element).toBeVisible();
    }
  });

  test('should maintain responsive layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that profile photo is still visible on mobile
    const profilePhoto = page.locator('img[alt="Gabriela De Sousa"]');
    await expect(profilePhoto).toBeVisible();

    // Check that header content is still visible
    const name = page.locator('h1:has-text("Gabriela De Sousa")');
    await expect(name).toBeVisible();
  });
});
