import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
}

async function loadAllImages(page: import("@playwright/test").Page) {
  const count = await page.locator("img").count();

  for (let index = 0; index < count; index += 1) {
    await page.evaluate((imageIndex) => {
      const image = document.querySelectorAll("img")[imageIndex];
      image?.scrollIntoView({ block: "center", behavior: "auto" });
    }, index);
    await page.waitForTimeout(100);
  }

  await expect
    .poll(
      async () =>
        page.locator("img").evaluateAll((items) =>
          items.every((image) => {
            const img = image as HTMLImageElement;
            return img.complete && img.naturalWidth > 0;
          }),
        ),
      { timeout: 20000 },
    )
    .toBe(true);

  await page.evaluate(() => window.scrollTo(0, 0));
}

async function checkLayout(page: import("@playwright/test").Page) {
  await expect(page.getByRole("heading", { level: 1, name: "Anora" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Message Anora" })).toBeVisible();
  await expect(page.getByText("Active in Bangalore", { exact: true }).first()).toBeVisible();
  await expect(page.locator("#rates article")).toHaveCount(3);
  await expect(page.locator("#gallery button[aria-label^='Open gallery image']")).toHaveCount(6);
  await expectNoHorizontalOverflow(page);
}

async function verifyHorizontalGallery(page: import("@playwright/test").Page) {
  const rail = page.getByTestId("gallery-rail");
  await expect(rail).toBeVisible();

  const before = await rail.evaluate((element) => element.scrollLeft);
  await page.getByRole("button", { name: "Scroll gallery right" }).click();

  await expect
    .poll(async () => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(before + 20);
}

test("premium desktop gallery flows left to right", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  await checkLayout(page);
  await page.locator("#gallery").scrollIntoViewIfNeeded();
  await verifyHorizontalGallery(page);

  const firstCard = page.locator("[data-gallery-card]").first();
  const cardWidth = await firstCard.evaluate((element) => element.getBoundingClientRect().width);
  expect(cardWidth).toBeGreaterThan(350);
  expect(cardWidth).toBeLessThan(520);

  await page.getByRole("button", { name: "Open gallery image 1" }).click();
  await expect(page.getByTestId("gallery-lightbox")).toBeVisible();
  await page.getByRole("button", { name: "Close gallery" }).click();

  await loadAllImages(page);
  await expectNoHorizontalOverflow(page);

  await page.screenshot({ path: "test-results/desktop-full.png", fullPage: true });
});

test("premium mobile gallery swipes one card at a time", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await checkLayout(page);

  const heroHeight = await page.locator("#top").evaluate((element) => element.getBoundingClientRect().height);
  expect(heroHeight).toBeLessThan(1450);

  await page.locator("#gallery").scrollIntoViewIfNeeded();
  const firstCard = page.locator("[data-gallery-card]").first();
  const cardWidth = await firstCard.evaluate((element) => element.getBoundingClientRect().width);
  expect(cardWidth).toBeGreaterThan(280);
  expect(cardWidth).toBeLessThan(350);

  await verifyHorizontalGallery(page);

  await loadAllImages(page);
  await expectNoHorizontalOverflow(page);

  await page.screenshot({ path: "test-results/mobile-full.png", fullPage: true });
});
