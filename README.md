# iMpact Inc — Website

A modern, multi-section marketing site for **iMpact Inc**, structured like a full
agency/services template (hero → stats → services → process → team → insights →
footer) and styled entirely in the iMpact brand: **navy + teal, Poppins,
People · Purpose · Progress**.

Plain HTML, CSS and vanilla JavaScript — no framework, no build step.

---

## Sections

1. **Hero** – headline, dual CTAs, a floating "constellation" of the people we serve, and a trusted-by strip
2. **Stats** – animated count-up metrics
3. **Marquee** – scrolling strip of focus areas
4. **About** – mission, supporting points and a results chip
5. **Why us** – three reasons to choose iMpact
6. **Who we help** – split cards for *Leaders* and *Organisations*
7. **Services** – eight focus areas in an interactive grid
8. **Process** – tabbed *For leaders* / *For organisations* steps
9. **Team** – team grid (initial-avatar placeholders)
10. **Insights** – latest articles
11. **Newsletter / Contact** – subscribe + get-in-touch
12. **Footer** – brand, link columns, social

> **Placeholders to replace:** team names/roles, client names in the hero strip,
> insight article titles/dates, and contact details (`hello@impactinc.co`,
> `+255 700 000 000`, Dar es Salaam). Drop real photography into the team and
> insight cards whenever you have it — the markup is ready for `<img>`.

---

## Quick start

It's static, so serve the folder and open it:

```bash
python3 -m http.server 8000      # then visit http://localhost:8000
# or:  npx serve .
```

In VS Code: right-click `index.html` → **Open with Live Server**.

---

## Structure

```
impact-inc-site/
├── index.html        # the full page
├── 404.html          # on-brand not-found page
├── css/styles.css    # design tokens (top) + all components
├── js/main.js        # nav, scroll reveals, counters, process tabs
├── assets/           # logo-mark.svg + favicon.svg
└── README.md
```

---

## Contact form

The contact section (`#contact`) has a real, validated form. Because the site is
static, it sends through a **form-backend service** — no server of your own
needed. Out of the box it runs in safe **demo mode** (validates + shows success
but doesn't deliver) until you add an endpoint.

**To make it live (recommended: Web3Forms — free, no account):**
1. Go to web3forms.com, enter your email, copy the access key.
2. In `index.html`, find the form and replace `YOUR-ACCESS-KEY-HERE`.

That's it — submissions land in your inbox. The form also:
- validates name/email/message inline with accessible error messaging,
- blocks bots with a hidden honeypot field,
- shows a live success/error status and a "Sending…" button state.

**Prefer Formspree?** Replace the form's `action` with your Formspree URL
(`https://formspree.io/f/xxxx`) and delete the `access_key` line.

**On Netlify?** Add `data-netlify="true"` and a `name` to the `<form>` and Netlify
captures submissions automatically (then trim the fetch handler in `main.js`).

Update the displayed email, phone and location in the contact section and footer
to your real details, and point the "privacy notice" link at your policy.



| Token        | Hex       |
|--------------|-----------|
| `--navy`     | `#20283F` |
| `--teal`     | `#3C9D9F` |
| `--teal-deep`| `#2E7A7C` |
| `--paper`    | `#FBF8F1` |
| `--mist`     | `#E3ECE6` |
| `--slate`    | `#979BA9` |

Typeface: **Poppins** (Google Fonts).

---

## Deploying

**GitHub Pages:** push the folder → Settings → Pages → deploy from `main` / root.
`404.html` is served automatically. Works the same on Netlify, Vercel or
Cloudflare Pages with no build command.

---

## Accessibility & performance

Semantic landmarks, labelled controls, ARIA tabs, visible keyboard focus,
`prefers-reduced-motion` respected (animations and counters degrade gracefully),
and the page is fully readable with JavaScript off. The only external request is
the Poppins font.

---

© 2026 iMpact Inc. Built on the iMpact Inc brand guidelines. Layout inspired by a
classic multi-section services template, rethought for the iMpact identity.
