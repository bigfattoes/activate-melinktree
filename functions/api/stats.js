// GET /api/stats — the numbers for the private /stats page.
// Password = the STATS_PASSWORD secret in Cloudflare, sent as "Authorization: Bearer …" (never in the URL).
import { ready } from "./hit.js";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ ok: false, error: "The database isn't connected yet. See the README, \"Click counts\"." }, 503);
  if (!env.STATS_PASSWORD) return json({ ok: false, error: "STATS_PASSWORD isn't set in Cloudflare yet. See the README, \"Click counts\"." }, 503);

  const header = request.headers.get("authorization") || "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!(await same(given, env.STATS_PASSWORD))) {
    await new Promise((r) => setTimeout(r, 400)); // slows down guessing
    return json({ ok: false, error: "Wrong password" }, 401);
  }

  await ready(env.DB);
  const totals = await env.DB.prepare("SELECT what, SUM(n) AS n, MIN(day) AS since FROM hits GROUP BY what ORDER BY n DESC").all();
  const days = await env.DB.prepare(
    "SELECT day, SUM(CASE WHEN what = 'visit' THEN n ELSE 0 END) AS visits, SUM(CASE WHEN what = 'tickets' THEN n ELSE 0 END) AS tickets, SUM(CASE WHEN what <> 'visit' THEN n ELSE 0 END) AS taps FROM hits GROUP BY day ORDER BY day DESC LIMIT 120"
  ).all();
  return json({ ok: true, totals: totals.results, days: days.results });
}

// Compares two pieces of text without leaking how close a guess was.
async function same(a, b) {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  const x = new Uint8Array(ha), y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}
