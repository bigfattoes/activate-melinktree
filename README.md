# ActivateMe™ Fest links

Our own link-in-bio page (a free Linktree alternative), hosted on Cloudflare Pages.

Everything you'd normally change is in the `EDIT THE PAGE HERE` block near the bottom of `index.html`:

| Setting | What it does |
|---|---|
| `EVENT.mapsUrl` | Google Maps pin for the exact venue (Share → Copy link). Empty = searches "Dubai Silicon Oasis". |
| `EVENT.coords` | Optional `lat,lng` so Apple Maps drops the pin on the venue too. |
| `FEATURED` | The two big tiles: Become Acti AR filter and the quiz. |
| `REELS` | Reel previews (`reels/*.mp4`). Put each reel's Instagram link in `url`. |
| `SOCIAL` | Instagram, TikTok, LinkedIn. |
| `WHATSAPP_PACKS` | Sticker.ly link for each sticker pack. The green "Add to WhatsApp" button follows the open tab. |

Files: `img/` Acti poses for the tiles, `reels/` reel videos and posters, `stickers/` the WhatsApp stickers (from `acti-stickers`), `activatemefest-2027.ics` the calendar event.
