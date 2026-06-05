import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const isProd = process.env.NODE_ENV === "production";

export async function launchBrowser() {
  if (!isProd) {
    // LOCAL
    return puppeteer.launch({
      headless: true,
    });
  }

  // PRODUCTION (Vercel)
  return puppeteerCore.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}