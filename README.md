# ActivateMe™ Fest links

Our own link-in-bio page (a free Linktree alternative), hosted on Cloudflare Pages.

Everything you'd normally change is in the `EDIT THE PAGE HERE` block near the bottom of `index.html`:

| Setting | What it does |
|---|---|
| `TICKETS_URL` | The big "Get your tickets" card. |
| `actiStage()` | Acti's pose and speech bubble as the festival gets closer (wave → point → run → jump → dance → thanks). |
| `SURPRISES` / `RARE` | What Acti does when tapped. The rare sleepy Acti shows about 1 tap in 15. |
| `HEADLINE_PARTNERS` / `PARTNERS` / `CLUBS` | The "Meet the family" section. Logos live in `partners/`. |
| `EVENT.mapsUrl` | Google Maps pin for the exact venue (Share → Copy link). Empty = searches "Dubai Silicon Oasis". |
| `EVENT.coords` | Optional `lat,lng` so Apple Maps drops the pin on the venue too. |
| `FEATURED` | The two big tiles: Become Acti AR filter and the quiz. |
| `REELS` | Reel previews (`reels/*.mp4`). Put each reel's Instagram link in `url`. |
| `SOCIAL` | Instagram, TikTok, LinkedIn. |
| `WHATSAPP_PACKS` | Sticker.ly link for each sticker pack. The green "Add to WhatsApp" button follows the open tab. |

Files: `img/` Acti poses (`img/acti/` for the ticket card, surprises and story card), `fonts/` Baloo 2 for the story card, `reels/` reel videos and posters, `stickers/` the WhatsApp stickers (from `acti-stickers`), `activatemefest-2027.ics` the calendar event.

## Click counts

The page counts visits and taps on every link: tickets, the AR filter and quiz tiles, reels, socials, maps, calendar and stickers. It's anonymous. It saves the day, which link, and a running total, never anything about the person.

**See the numbers:** open `https://<this site>/stats` and type the password. It shows visits, ticket taps, every link, and a day-by-day table.

**One-time setup in Cloudflare** (counting starts once steps 1 to 4 are done; nothing before that is counted):

1. **Create the database.** Cloudflare dashboard → **Storage & Databases → D1 SQL Database → Create Database**. Name it `activateme-links`.
2. **Connect it to the site.** **Workers & Pages** → this project → **Settings → Bindings → Add → D1 database**. Variable name `DB` (capitals), database `activateme-links`. Save.
3. **Set the password.** Same Settings page → **Variables and Secrets → Add**. Type `Secret`, name `STATS_PASSWORD`, value a long password only the team knows. Save.
4. **Redeploy.** **Deployments** → the latest one → **⋯ → Retry deployment**, so the site picks up steps 2 and 3.

Files: `functions/api/hit.js` (adds 1 to a count), `functions/api/stats.js` (the numbers, password required), `stats.html` (the private page), `_routes.json` (keeps the rest of the site as plain files). The table is created automatically. To count a new link, give it a name in `COUNTED` near the bottom of `index.html` and add the same name to the list at the top of `functions/api/hit.js`.
