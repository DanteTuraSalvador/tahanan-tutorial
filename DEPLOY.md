# Deploying Tahanan to Cloudflare Pages (Free)

This site is set up to deploy to **Cloudflare Pages** with the AI chat backed
by a **Cloudflare Pages Function** (so your Groq API key stays server-side).

Free tier: unlimited bandwidth, 500 builds/month, 100k Pages Function requests/day.

---

## What gets deployed

| Folder / file              | Where it goes on Cloudflare           |
|----------------------------|----------------------------------------|
| `dist/` (after `npm run build`) | Static asset hosting                |
| `functions/api/chat.js`    | Pages Function at `POST /api/chat`     |
| `GROQ_API_KEY` env var     | Server-side secret (never bundled)     |

---

## Option A — Connect via GitHub (recommended)

Auto-deploys on every push to `main`.

### 1. Push the project to GitHub

```bash
cd "C:/etho's cave"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USER/tahanan-tutorial.git
git push -u origin main
```

> `.env` and `node_modules/` are already in `.gitignore` — your key won't leak.

### 2. Create the Pages project

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create**
2. Click **Pages** → **Connect to Git** → pick your repo
3. **Build settings:**
   - Framework preset: **None** (or *Vite* if it appears)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave empty
4. **Environment variables (Production):**
   - Add **`GROQ_API_KEY`** → paste your Groq key → click the lock icon to mark as **encrypted**
   - Add **`NODE_VERSION`** → `20` (optional but recommended)
5. Click **Save and Deploy**

First build takes ~1–2 minutes. After it finishes you get a URL like
`https://tahanan-tutorial.pages.dev`.

### 3. Test it

Open the URL → click the AI bubble (bottom-right) → ask
*"How much are the fees?"* It should answer from the proxy with no key prompt.

### 4. (Optional) Custom domain

In the Pages project → **Custom domains** → add `tahanantutorial.com` (or
whatever you own). Cloudflare auto-configures DNS if the domain is already
on Cloudflare; otherwise it walks you through pointing a CNAME.

---

## Option B — Direct deploy via Wrangler CLI (no GitHub needed)

One-shot deploys from your laptop.

### 1. Install Wrangler & log in

```bash
npx wrangler@latest login
```

A browser tab opens — log in with the same Cloudflare account.

### 2. Build + deploy

```bash
npm run deploy
```

That runs `vite build` then `wrangler pages deploy dist --project-name=tahanan-tutorial`.

First run will ask you to **create the project** — confirm. Pick a production
branch name like `main`.

### 3. Add the secret env var

Wrangler can deploy assets but the dashboard is easiest for secrets:

1. https://dash.cloudflare.com → **Workers & Pages** → `tahanan-tutorial`
2. **Settings** → **Environment variables** → **Production** tab
3. Add `GROQ_API_KEY` = your key → **Encrypt** → Save
4. Re-run `npm run deploy` (or click *Retry deployment* in dashboard) so the Function picks up the variable

> The encrypted secret is only readable from inside the Pages Function — never sent to the browser.

---

## Local development

Just `npm run dev` like before. Vite's dev proxy (`vite.config.js`) forwards
`/api/chat` → Groq using the `GROQ_API_KEY` from your local `.env`. Same code
path as production, no client-side key exposure.

---

## Rotating the key

Anytime — old or compromised key:

1. https://console.groq.com/keys → delete the old one → create a new one
2. **Local**: update `.env` → restart `npm run dev`
3. **Production**: Cloudflare dashboard → Pages project → Settings → Environment variables → edit `GROQ_API_KEY` → **redeploy** (click *Retry deployment* on the latest build, or push a new commit)

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "Server is missing the GROQ_API_KEY env var" | Variable not set in Cloudflare | Add it under Settings → Environment variables, then redeploy |
| 401 errors when chatting | Stale key or wrong key in `.env` / Cloudflare | Rotate + replace + redeploy |
| 429 errors | Hit Groq's rate limit | Wait a few seconds, or upgrade Groq plan |
| `/api/chat` returns the SPA HTML | Pages Function didn't deploy | Confirm `functions/api/chat.js` is in the repo + redeploy |
| Build fails on Cloudflare | Wrong Node version | Set `NODE_VERSION=20` env var |
