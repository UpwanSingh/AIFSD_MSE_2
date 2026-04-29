const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT_DIR = "/Users/upwansingh/Desktop/AIFSD_MSE_2/evidence/postman_screenshots";
const BASE = "https://student-grievance-backend-mfqb.onrender.com/api";

const clean = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function apiCall(method, url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let response;
  try {
    response = JSON.parse(text);
  } catch {
    response = text;
  }

  return { method, url, status: res.status, headers, body, response };
}

function toHtml(item, idx) {
  const color = item.status >= 200 && item.status < 300 ? "#047857" : "#b91c1c";
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f3f4f6; }
        .wrap { padding: 20px; }
        .card { background: #fff; border-radius: 10px; padding: 16px; box-shadow: 0 4px 14px rgba(0,0,0,.08); }
        .row { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
        .method { font-weight: 700; color: #1d4ed8; }
        .status { font-weight: 700; color: ${color}; }
        .url { word-break: break-all; color: #111827; }
        h3 { margin: 0 0 12px; }
        .sec { margin-top: 12px; }
        .label { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
        pre { background: #111827; color: #f9fafb; border-radius: 8px; padding: 12px; overflow: auto; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <h3>Postman Evidence ${idx}</h3>
          <div class="row">
            <div class="method">${item.method}</div>
            <div class="status">Status: ${item.status}</div>
          </div>
          <div class="url">${item.url}</div>

          <div class="sec">
            <div class="label">Request Body</div>
            <pre>${JSON.stringify(item.body ?? {}, null, 2)}</pre>
          </div>

          <div class="sec">
            <div class="label">Response</div>
            <pre>${JSON.stringify(item.response, null, 2)}</pre>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const email = `postman_${Date.now()}@example.com`;
  const password = "123456";

  const steps = [];

  steps.push(await apiCall("POST", `${BASE}/register`, { name: "Postman User", email, password }));
  steps.push(await apiCall("POST", `${BASE}/register`, { name: "Postman User", email, password })); // duplicate
  steps.push(await apiCall("POST", `${BASE}/login`, { email, password: "wrongpass" })); // invalid

  const login = await apiCall("POST", `${BASE}/login`, { email, password });
  steps.push(login);
  const token = login.response?.token;

  steps.push(await apiCall("GET", `${BASE}/grievances`)); // unauthorized

  const created = await apiCall(
    "POST",
    `${BASE}/grievances`,
    { title: "Postman screenshot grievance", description: "Capture for report", category: "Other", status: "Pending" },
    token
  );
  steps.push(created);
  const id = created.response?.grievance?._id;

  steps.push(await apiCall("GET", `${BASE}/grievances`, null, token));
  steps.push(await apiCall("GET", `${BASE}/grievances/${id}`, null, token));
  steps.push(await apiCall("PUT", `${BASE}/grievances/${id}`, { status: "Resolved" }, token));
  steps.push(await apiCall("GET", `${BASE}/grievances/search?title=postman`, null, token));
  steps.push(await apiCall("DELETE", `${BASE}/grievances/${id}`, null, token));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });

  const files = [];
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const name = `${String(i + 1).padStart(2, "0")}_${clean(`${s.method}_${s.url}`)}.png`;
    const outPath = path.join(OUT_DIR, name);
    await page.setContent(toHtml(s, i + 1), { waitUntil: "domcontentloaded" });
    await page.screenshot({ path: outPath, fullPage: true });
    files.push(name);
  }

  await browser.close();

  const readme = [
    "# Postman-style API Screenshots",
    "",
    "Generated screenshots:",
    ...files.map((f) => `- ${f}`),
    "",
    "These include success and error cases required in submission.",
  ].join("\n");

  fs.writeFileSync(path.join(OUT_DIR, "README.md"), readme);
  console.log(`Saved ${files.length} screenshots in ${OUT_DIR}`);
})();
