const fs = require("fs");

const base = "https://student-grievance-backend-mfqb.onrender.com/api";
const email = `render_student_${Date.now()}@example.com`;
const password = "123456";

async function call(method, url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }

  return { method, url, status: res.status, response: parsed };
}

(async () => {
  const out = [];

  out.push(await call("GET", "https://student-grievance-backend-mfqb.onrender.com/"));

  const register = await call("POST", `${base}/register`, {
    name: "Render Demo Student",
    email,
    password,
  });
  out.push(register);

  out.push(await call("POST", `${base}/register`, { name: "Render Demo Student", email, password }));
  out.push(await call("POST", `${base}/login`, { email, password: "wrongpass" }));

  const login = await call("POST", `${base}/login`, { email, password });
  out.push(login);
  const token = login.response?.token;

  out.push(await call("GET", `${base}/grievances`));

  const created = await call(
    "POST",
    `${base}/grievances`,
    {
      title: "Render test grievance",
      description: "Created by live API evidence script.",
      category: "Other",
      status: "Pending",
    },
    token
  );
  out.push(created);

  const grievanceId = created.response?.grievance?._id;

  out.push(await call("GET", `${base}/grievances`, null, token));
  out.push(await call("GET", `${base}/grievances/${grievanceId}`, null, token));
  out.push(
    await call(
      "PUT",
      `${base}/grievances/${grievanceId}`,
      { status: "Resolved", title: "Render test grievance resolved" },
      token
    )
  );
  out.push(await call("GET", `${base}/grievances/search?title=render`, null, token));
  out.push(await call("DELETE", `${base}/grievances/${grievanceId}`, null, token));

  const lines = [];
  lines.push("# Live Render API Test Evidence");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");

  for (const item of out) {
    lines.push(`## ${item.method} ${item.url}`);
    lines.push(`Status: ${item.status}`);
    lines.push("");
    lines.push("```json");
    lines.push(JSON.stringify(item.response, null, 2));
    lines.push("```");
    lines.push("");
  }

  const outPath = "/Users/upwansingh/Desktop/AIFSD_MSE_2/evidence/LIVE_RENDER_API_TEST_RESULTS.md";
  fs.writeFileSync(outPath, lines.join("\n"));

  console.log("Live API evidence generated:");
  console.log(outPath);
})();
