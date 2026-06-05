import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const isProd = process.env.NODE_ENV === "production";

export async function launchBrowser() {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("isProd:", isProd);

  if (!isProd) {
    console.log("Launching local puppeteer");

    return puppeteer.launch({
      headless: true,
    });
  }

  console.log("Launching Vercel chromium");

  try {
    const executablePath = await chromium.executablePath();

    console.log("chromium path:", executablePath);
    console.log("chromium args length:", chromium.args.length);

    return puppeteerCore.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });
  } catch (err) {
    console.error("CHROMIUM ERROR:", err);
    throw err;
  }
}