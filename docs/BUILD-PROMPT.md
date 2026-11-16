# Digital.Life: concept and phase-wise build prompt

## 1. The concept

**Positioning:** Digital.Life is the consumer control centre for the part of life that runs on screens. Five pillars: Security, Privacy, Money, Wellbeing, Legacy.

**Why this concept earns the most from this domain**

- The name is a category, so the site can own a broad evergreen topic instead of one keyword.
- The pillars sit in high-value advertising verticals: security software, identity protection, VPNs, password managers, banking, insurance and cloud storage.
- Tools create repeat visits, links and long sessions that article-only sites do not get.
- A scored quiz is the strongest lead magnet in the niche: the visitor gets a personal result, then is offered a plan.
- Live breach and scam data gives a reason to return and keeps pages fresh without editorial labour.

**Revenue stack:** Google AdSense (Auto ads plus fixed units), sponsorships of tools and challenge rounds, reader donations, lead list, and later affiliate comparisons.

**Research base:** 35 sites reviewed across official guidance (CISA, FTC, NCSC, Get Safe Online), non-profits (EFF, National Cybersecurity Alliance, Privacy Guides, Common Sense Media, Internet Matters, ConnectSafely, Digital Wellness Lab, Center for Humane Technology), tools (Have I Been Pwned, Consumer Reports Security Planner, Bitwarden, Proton, Security.org), publishers (How-To Geek, MakeUseOf, Digital Trends, TechRadar, Tom's Guide, Engadget, Techlicious, Krebs on Security, BleepingComputer, Malwarebytes, Comparitech, SafeWise, NerdWallet, Zapier, Pew Research) and AI directories (There's An AI For That, Future Tools).

**Patterns adopted from them**

| Pattern seen | Where | Implemented as |
|---|---|---|
| Question-based personal plan | Security Planner, Internet Matters | Digital Life Score with ranked fixes |
| Free utility as the front door | Have I Been Pwned, Bitwarden, Proton, Security.org | Eight in-browser tools |
| Scam and website checkers | Get Safe Online | Scam message checker |
| Newsletter and alert sign-up on every page | FTC, NCSC, most publishers | Reset plan lead form, home and score pages |
| Free resource in exchange for email | Future Tools | 7-day checklist unlocked on sign-up |
| Glossary | National Cybersecurity Alliance | 40-term searchable glossary |
| Donate, sponsor, speaker and partner routes | EFF, National Cybersecurity Alliance | Support and Community pages |
| Breach feed | Have I Been Pwned | Live radar |
| Video hub | Privacy Guides, Proton, Internet Matters | Self-updating video library |
| Calculators | NerdWallet | Subscription audit, screen time calculator |

## 2. Fixed requirements for every phase

- Domain: Digital.Life. Static site, no build step, hosted on GitHub Pages free plan from `main` root. All internal links relative.
- AdSense publisher `ca-pub-6620975821265271`; the loader script goes in the `<head>` of every page; `ads.txt` at the root.
- Top of every page: a bar reading "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership", linking to the owner's contact page. The destination is not shown as text.
- All forms deliver to the owner's single inbox. The address never appears in page text or markup.
- No use of third-party trademarks as branding; include a trademark and copyright disclosure.
- Original content only. Third-party material limited to headlines with links, licensed data with attribution and official YouTube embeds.

## 3. Phase-wise prompt

### Phase 1: Foundation and design system
Build a static site skeleton for Digital.Life. Create `assets/style.css` with design tokens (paper background, ink text, green accent, lime highlight), light and dark themes, a serif display face, a sans body face and a mono label face, responsive grid, cards, buttons, forms, tables, meters and print styles. Create `assets/site.js` that injects a sticky header with mobile menu and theme toggle, and a footer with site links and a trademark notice. Every page carries the AdSense loader in the head and the static contact bar as the first element in the body. Add favicon, `robots.txt`, `ads.txt`, `.nojekyll` and a 404 page.

### Phase 2: Home page
Build `index.html`: hero with the promise and two calls to action (score, reset plan); the five pillars; a tools grid; live breach and news panels; featured guides; latest videos; an embedded lead form; a support band. Keep it scannable and fast, with reveal-on-scroll and no layout shift.

### Phase 3: Interactive tools
Build `assets/tools.js` and one page per tool under `tools/`: Digital Life Score (15 questions, five pillars, score, grade, ranked fixes with links), password strength checker (entropy estimate, pattern penalties, crack time), passphrase generator (cryptographic randomness), scam message checker (pattern rules with weights), subscription audit (monthly, yearly, ten-year and invested totals), screen time calculator, breach response checklist and digital legacy planner (saved locally, printable). All tools run client-side and send nothing. Each page has at least 200 words of original explanation below the tool.

### Phase 4: Guides
Write twelve original guides of 500 words or more under `guides/`, each with a clear title, summary, numbered steps, a call-out box, internal links to the matching tool and a next-step link. Topics: password manager, two-step login and passkeys, scam signals, home Wi-Fi, breach response, privacy checkup, AI assistants, subscriptions, screen time, a child's first phone, 3-2-1 backup, digital legacy. Add a filterable index.

### Phase 5: Self-updating content
Add live modules to `site.js` that refresh on each visit with local caching and a static fallback: newest breaches from the Have I Been Pwned public API with attribution; security and scam headlines from official and independent RSS feeds, shown as headline, source, date and link; recent videos from selected YouTube channels, shown as thumbnails that load the privacy-enhanced player on click. Build `radar.html` and `videos.html` around them with original explanatory copy.

### Phase 6: Lead generation
Build `start.html` as a dedicated landing page: one promise, the 7-day outline, a short form (name, email, who it is for, biggest worry, consent) and an instant reward (`checklist.html` unlocked on success). Repeat the form on the home page and after the score result, passing the score with the submission. Forms use fetch, a honeypot field, inline success and error states and never expose the destination address.

### Phase 7: Support, contests, hiring and sponsorship
Build `support.html` (what funding pays for: operations, promotion, hiring, contests and prizes; one-time, monthly, sponsor and prize-partner options; pledge form; configurable payment links) and `community.html` (challenge rounds with rules, registration form, contributor application form, partner route). State plainly that contests are free to enter and that donations do not affect chances.

### Phase 8: Trust, legal and AdSense readiness
Write About, Contact, Privacy Policy (AdSense cookie disclosure and opt-out links, forms, local storage, third-party requests), Terms of Use, and a Disclaimer with trademark and copyright disclosure stating no affiliation with any product or company using similar words. Add a cookie notice, a glossary, a resources directory and `sitemap.xml`. Check: every page reachable from navigation, unique titles and descriptions, no empty or placeholder pages, no ad-like empty boxes, mobile layout correct.

### Phase 9: Publish and verify
Push to `main`, enable GitHub Pages from the branch root, then verify: all internal links resolve, scripts parse, the owner address does not appear in any file as plain text, the AdSense loader is on every page, forms submit, live modules fall back cleanly, and Lighthouse scores are acceptable on mobile.

### Phase 10: Growth backlog
Connect the custom domain and move `sitemap.xml` and canonical URLs to it; submit the sitemap in Search Console; apply for AdSense; add fixed ad units; publish two new guides a week; add comparison pages for password managers, VPNs and backup services with affiliate links; add translations; add a monthly challenge round with a sponsor.
