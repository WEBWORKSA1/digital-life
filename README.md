# Digital.Life

A static, AdSense-ready website for the domain **Digital.Life**: free tools, guides and live breach alerts for security, privacy, digital money, wellbeing and legacy.

No build step. Plain HTML, CSS and JavaScript, served by GitHub Pages from the `main` branch root.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home |
| `start.html`, `checklist.html` | Lead-generation landing page and the unlocked 7-day plan |
| `tools/` | Eight browser-based tools (score, password, passphrase, scam checker, subscriptions, screen time, breach checklist, legacy planner) |
| `guides/` | Twelve original guides |
| `radar.html`, `videos.html` | Self-updating pages (breaches, security news, YouTube) |
| `support.html`, `community.html` | Donations, sponsorship, contests, prizes, contributor applications |
| `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html` | Trust and legal pages required for AdSense |
| `assets/site.js` | Header, footer, forms, live feeds, ad units, cookie notice |
| `assets/tools.js` | Tool logic |
| `assets/style.css` | Design system, light and dark themes |
| `ads.txt`, `robots.txt`, `sitemap.xml` | Crawling and ad authorisation |
| `docs/BUILD-PROMPT.md` | The phase-wise prompt used to build this site |

## Owner configuration

All settings live in the `CFG` block at the top of `assets/site.js`:

- `ads`: paste AdSense ad-unit slot IDs to switch on fixed placements. Auto ads work without them.
- `pay`: paste payment links to make the Support page buttons go straight to checkout.

## Publishing

Settings > Pages > Build and deployment > Source: **Deploy from a branch** > Branch: **main** / **root**.

When the custom domain is connected, add it under Settings > Pages, then update the URLs in `sitemap.xml` and `robots.txt`. `ads.txt` is only read by AdSense at the root of the domain, so it takes effect once the custom domain is live.

## Forms

Forms post to a form delivery service and arrive in the owner's inbox. The first submission triggers a one-time activation message that must be confirmed before deliveries start. The destination address is assembled at runtime and is not printed anywhere in the pages.

## Notices

Independent publication. Not affiliated with any company, product or service using the words "digital life" in its name. See `disclaimer.html`.
