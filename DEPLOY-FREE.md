# Deploy APEXPDF — FREE, no server needed

The entire website is **one file: `index.html`**. All tools run in the visitor's browser
(pdf-lib, pdf.js, Tesseract from CDN). There is nothing to install, no backend, no costs.

Pick any ONE of these three. All give you free HTTPS automatically.

---

## Option A — Netlify Drop (fastest, ~60 seconds)
1. Go to `https://app.netlify.com/drop`
2. Sign in free → drag the folder containing `index.html` onto the page
3. Live instantly at `https://random-name.netlify.app`
4. Site settings → Change site name → `apexpdf.netlify.app` (if free)

## Option B — Cloudflare Pages (best long-term, unlimited bandwidth)
1. `https://dash.cloudflare.com` → sign up free
2. Workers & Pages → Create → Pages → **Upload assets**
3. Drag the folder with `index.html` → Deploy
4. Free custom-domain support included

## Option C — GitHub Pages (classic)
1. Create a GitHub account → New repository (public), e.g. `apexpdf`
2. Upload `index.html` (Add file → Upload files → Commit)
3. Repo Settings → Pages → Source: `main` branch, `/ (root)` → Save
4. Live in ~2 min at `https://YOURUSERNAME.github.io/apexpdf/`

---

## Custom domain (~$10/yr, optional)
Buy on Namecheap/Porkbun/Cloudflare → add domain in your host's settings → they provision SSL.
On GitHub Pages: repo Settings → Pages → Custom domain → add `www.yourdomain.com`, plus a CNAME record at your registrar.

## Notes
- First OCR run per language downloads a ~12 MB model straight from CDN to the visitor's browser (cached afterwards). Nothing touches your hosting quota.
- Very large PDFs use the visitor's RAM — same as desktop apps.
- Monetization unchanged: AdSense works fine on static sites; Stripe Payment Links work anywhere.
- Local dev: just double-click index.html — it even works offline after first visit (browser cache).
