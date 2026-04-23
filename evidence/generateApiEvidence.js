const fs = require("fs");

const base = "http://localhost:5001/api";
const email = `student_${Date.now()}@example.com`;
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

  return {
    method,
    url,
    status: res.status,
    response: parsed,
  };
}

(async () => {
  const out = [];

  const register = await call("POST", `${base}/register`, {
    name: "Demo Student",
    email,
    password,
  });
  out.push(register);

  const duplicate = await call("POST", `${base}/register`, {
    name: "Demo Student",
    email,
    password,
  });
  out.push(duplicate);

  const invalidLogin = await call("POST", `${base}/login`, {
    email,
    password: "wrongpass",
  });
  out.push(invalidLogin);

  const login = await call("POST", `${base}/login`, { email, password });
  out.push(login);

  const token = login.response?.token;

  const unauthorized = await call("GET", `${base}/grievances`);
  out.push(unauthorized);

  const create = await call(
    "POST",
    `${base}/grievances`,
    {
      title: "Mess food issue",
      description: "Food quality needs improvement.",
      category: "Hostel",
      status: "Pending",
    },
    token
  );
  out.push(create);

  const grievanceId = create.response?.grievance?._id;

  const getAll = await call("GET", `${base}/grievances`, null, token);
  out.push(getAll);

  const getById = await call("GET", `${base}/grievances/${grievanceId}`, null, token);
  out.push(getById);

  const update = await call(
    "PUT",
    `${base}/grievances/${grievanceId}`,
    { status: "Resolved", title: "Mess food issue resolved" },
    token
  );
  out.push(update);

  const search = await call(
    "GET",
    `${base}/grievances/search?title=mess`,
    null,
    token
  );
  out.push(search);

  const del = await call("DELETE", `${base}/grievances/${grievanceId}`, null, token);
  out.push(del);

  const lines = [];
  lines.push("# API Test Evidence");
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

  fs.writeFileSync(
    "/Users/upwansingh/Desktop/AIFSD_MSE_2/evidence/API_TEST_RESULTS.md",
    lines.join("\n")
  );

  console.log("API evidence generated:");
  console.log("/Users/upwansingh/Desktop/AIFSD_MSE_2/evidence/API_TEST_RESULTS.md");
})();
