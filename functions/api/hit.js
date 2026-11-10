// POST /api/hit — adds 1 to today's count for a visit or a tapped link.
// Anonymous on purpose: it stores the day, what was tapped and a running total. Nothing about who.
// Needs a D1 database connected as "DB" (see README, "Click counts"). Without it, this does nothing.

const ALLOWED = /^(visit|tickets|maps-apple|maps-google|calendar-apple|calendar-google|whatsapp-stickers|sticker-save|story-save|instagram-all|instagram-more|(tile|reel|social):[\w .,&'!?-]{1,40})$/i;
const BOTS = /bot|crawl|spider|preview|facebookexternalhit|whatsapp|slurp|headless|lighthouse/i;

export async function onRequestPost({ request, env }) {
  const done = new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  try {
    if (!env.DB) return done;
    // Only count taps that come from this page itself.
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== new URL(request.url).host) return done;
    if (BOTS.test(request.headers.get("user-agent") || "")) return done;

    const text = (await request.text()).slice(0, 200);
    const what = String(JSON.parse(text).what || "").trim().toLowerCase();
    if (!ALLOWED.test(what)) return done;

    const day = new Date(Date.now() + 4 * 36e5).toISOString().slice(0, 10); // Dubai time
    await ready(env.DB);
    await env.DB.prepare(
      "INSERT INTO hits (day, what, n) VALUES (?1, ?2, 1) ON CONFLICT(day, what) DO UPDATE SET n = n + 1"
    ).bind(day, what).run();
  } catch (e) {
    // A failed count must never get in a visitor's way.
  }
  return done;
}

let made = false;
export async function ready(DB) {
  if (made) return;
  await DB.prepare(
    "CREATE TABLE IF NOT EXISTS hits (day TEXT NOT NULL, what TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, what))"
  ).run();
  made = true;
}
