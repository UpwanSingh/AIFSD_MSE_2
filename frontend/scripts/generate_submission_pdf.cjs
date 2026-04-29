const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const { chromium } = require("playwright");

const projectRoot = "/Users/upwansingh/Desktop/AIFSD_MSE_2";
const inputArg = process.argv[2] || "MSE2_Submission_Filled.md";
const outputArg = process.argv[3] || "MSE2_Submission_Filled.pdf";
const markdownPath = path.isAbsolute(inputArg)
  ? inputArg
  : path.join(projectRoot, inputArg);
const outputPdfPath = path.isAbsolute(outputArg)
  ? outputArg
  : path.join(projectRoot, outputArg);

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

function toFileUrl(p) {
  const normalized = p.split(path.sep).join("/");
  return `file://${normalized}`;
}

function mimeFromExt(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

(async () => {
  const markdown = fs.readFileSync(markdownPath, "utf8");
  let htmlBody = md.render(markdown);

  htmlBody = htmlBody.replace(/src="(?!https?:\/\/|data:|file:\/\/)([^"]+)"/g, (_, relSrc) => {
    const decodedRelSrc = decodeURIComponent(relSrc);
    const abs = path.resolve(projectRoot, decodedRelSrc);

    if (fs.existsSync(abs)) {
      const base64 = fs.readFileSync(abs).toString("base64");
      const mime = mimeFromExt(abs);
      return `src="data:${mime};base64,${base64}"`;
    }

    return `src="${toFileUrl(abs)}"`;
  });

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>MSE2 Submission</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 28px;
        color: #111827;
        line-height: 1.45;
        font-size: 12px;
      }
      h1, h2, h3, h4 { color: #0f172a; margin-top: 18px; }
      h1 { font-size: 22px; }
      h2 { font-size: 18px; }
      h3 { font-size: 15px; }
      p, li { font-size: 12px; }
      img {
        max-width: 100%;
        height: auto;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        margin: 8px 0 14px;
        page-break-inside: avoid;
      }
      pre {
        background: #f3f4f6;
        padding: 10px;
        border-radius: 8px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      code { font-family: Menlo, monospace; }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #d1d5db;
        padding: 6px;
      }
      hr { border: none; border-top: 1px solid #d1d5db; margin: 18px 0; }
      a { color: #1d4ed8; }
    </style>
  </head>
  <body>${htmlBody}</body>
</html>`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.pdf({
    path: outputPdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "16mm", right: "12mm", bottom: "16mm", left: "12mm" },
  });

  await browser.close();
  console.log(`PDF generated at: ${outputPdfPath}`);
})();
