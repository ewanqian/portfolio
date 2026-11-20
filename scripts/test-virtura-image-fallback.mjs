// Install Playwright as described in audit-portfolio-browser.mjs, build React,
// then run against its local preview (never intercept the production site).
import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const base = process.env.PORTFOLIO_TEST_BASE || 'http://127.0.0.1:4173'
assert(['localhost', '127.0.0.1'].includes(new URL(base).hostname))
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox']
})
const selector = 'img[src*="VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/"], img[src*="VIRTURA_WEBSITE_ASSETS/01_AI_GALA/"]'
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64')
let checks = 0
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } })
    let mode = 'html'
    await context.route('https://virtura.space/**', route => mode === 'network'
      ? route.abort()
      : route.fulfill(mode === 'healthy'
        ? { status: 200, contentType: 'image/png', body: png }
        : { status: 200, contentType: 'text/html', body: '<html>Maintenance</html>' }))
    const page = await context.newPage()
    for (const [route, count] of [['/', 2], ['/#/projects/system-ersha', 7], ['/#/projects/china-ai-gala', 5]]) {
      for (mode of ['html', 'network', 'healthy']) {
        await page.goto(base + route)
        await page.reload()
        await page.locator(selector).first().waitFor()
        const imgs = page.locator(selector)
        assert.equal(await imgs.count(), count)
        for (const img of await imgs.all()) {
          await img.scrollIntoViewIfNeeded()
          await page.waitForFunction(el => el.complete, await img.elementHandle())
          if (mode === 'healthy') {
            await page.waitForFunction(el => el.naturalWidth > 0 && getComputedStyle(el).visibility === 'visible', await img.elementHandle())
          } else {
            await page.waitForFunction(el => getComputedStyle(el).visibility === 'hidden' && el.getAttribute('aria-hidden') === 'true', await img.elementHandle())
          }
          const frame = await img.evaluate(el => el.parentElement.getBoundingClientRect().toJSON())
          assert(frame.width > 0 && frame.height > 0)
        }
        assert(await page.locator('h1').count() > 0)
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
        checks++
      }
    }
    await context.close()
  }
  console.log(`Passed ${checks} desktop/mobile HTML-failure, network-failure and healthy navigation cases.`)
} finally {
  await browser.close()
}
