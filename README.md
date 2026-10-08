# ActivateMe™ Fest links

Our own link-in-bio page (a free Linktree alternative), hosted on Cloudflare Pages.

Everything you'd normally change is in the `EDIT THE PAGE HERE` block near the bottom of `index.html`:

| Setting | What it does |
|---|---|
| `TICKETS_URL` | The big "Get your tickets" card. |
| `actiStage()` | Acti's pose and speech bubble as the festival gets closer (wave → point → run → jump → dance → thanks). |
| `SURPRISES` / `RARE` | What Acti does when tapped. The rare sleepy Acti shows about 1 tap in 15. |
| `EVENT.mapsUrl` | Google Maps pin for the exact venue (Share → Copy link). Empty = searches "Dubai Silicon Oasis". |
| `EVENT.coords` | Optional `lat,lng` so Apple Maps drops the pin on the venue too. |
| `FEATURED` | The two big tiles: Become Acti AR filter and the quiz. |
| `REELS` | Reel previews (`reels/*.mp4`). Put each reel's Instagram link in `url`. |
| `SOCIAL` | Instagram, TikTok, LinkedIn. |
| `WHATSAPP_PACKS` | Sticker.ly link for each sticker pack. The green "Add to WhatsApp" button follows the open tab. |

Files: `img/` Acti poses (`img/acti/` for the ticket card, surprises and story card), `fonts/` Baloo 2 for the story card, `reels/` reel videos and posters, `stickers/` the WhatsApp stickers (from `acti-stickers`), `activatemefest-2027.ics` the calendar event.
