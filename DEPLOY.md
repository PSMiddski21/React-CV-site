# Deploying the CV site — GitHub + AWS Amplify Hosting

A practical step-by-step for getting this Vite/React project from your machine
to a live URL using GitHub for source control and AWS Amplify Hosting for
build, deploy, CDN, HTTPS and (optionally) a custom domain.

Total time first-run: ~15–20 minutes. After that, every `git push` to your
main branch redeploys automatically.

---

## 0. What you'll end up with

- Source on GitHub at `github.com/<you>/paul-middleton-cv`
- A live site on a free Amplify URL like
  `https://main.d1a2b3c4e5f6g.amplifyapp.com`
- Optional custom domain (e.g. `paulmiddleton.com`) with auto-renewing HTTPS
- Auto-redeploy on every push to `main`

---

## 1. Prerequisites

Install once:

| Tool | Why | Download |
|---|---|---|
| Git | push code to GitHub | <https://git-scm.com/download/win> |
| Node.js (LTS) | run the build locally | <https://nodejs.org> |
| GitHub account | host the repo | <https://github.com/join> |
| AWS account | host the site | <https://aws.amazon.com> |

Verify in PowerShell:

```powershell
git --version
node --version
npm --version
```

Sanity-check the project still builds locally before going further:

```powershell
cd "C:\Users\psmid\OneDrive\Documents\Claude\Projects\React CV site"
npm install
npm run build
```

A successful run produces a `dist/` folder. If that works, the Amplify build
will work too.

---

## 2. Push the project to GitHub

### 2.1 Create the repository on GitHub

1. Go to <https://github.com/new>.
2. **Repository name:** `paul-middleton-cv` (or whatever you prefer).
3. Visibility: **Public** is fine — this is a CV. Private also works with
   Amplify.
4. **Do not** tick "Add a README", "Add .gitignore" or "Add a license" — the
   project already has these (or doesn't need them). Empty repo is best.
5. Click **Create repository**. GitHub will show you a "push an existing
   repository" snippet — keep that tab open.

### 2.2 Initialise Git locally and push

In PowerShell, from the project folder:

```powershell
cd "C:\Users\psmid\OneDrive\Documents\Claude\Projects\React CV site"

git init
git add .
git commit -m "Initial CV site"
git branch -M main

# Replace <you> with your GitHub username
git remote add origin https://github.com/<you>/paul-middleton-cv.git
git push -u origin main
```

The first `git push` will prompt for GitHub authentication. Easiest path on
Windows is the **Git Credential Manager** that ships with Git for Windows —
it pops a browser window, you sign in once, and that's it. If you'd rather
use SSH, set up an SSH key under
[GitHub → Settings → SSH and GPG keys](https://github.com/settings/keys) and
use the `git@github.com:...` URL instead.

Confirm the code is on GitHub by refreshing the repo page in your browser.

---

## 3. Connect the repo to AWS Amplify Hosting

### 3.1 Open the Amplify console

1. Sign in to the [AWS Console](https://console.aws.amazon.com/).
2. Pick a region near your audience (e.g. **eu-west-2 / London** for UK).
   Amplify deploys to a global CDN regardless, but the build runs in your
   chosen region.
3. Search for **"Amplify"** and open it.
4. Click **Create new app** → **Host web app**.

### 3.2 Authorize GitHub

1. Choose **GitHub** as the source.
2. Click **Authorize** — Amplify redirects you to GitHub OAuth.
3. Grant access to either *all* your repositories or *only the
   paul-middleton-cv repo* (preferred — least privilege).
4. Back in Amplify, pick:
   - **Repository:** `paul-middleton-cv`
   - **Branch:** `main`
5. Click **Next**.

### 3.3 Configure build settings

Amplify will auto-detect Vite and propose a build spec. Replace the contents
with the spec below to be explicit (it's the same shape Amplify generates,
but pinned for clarity).

Click **Edit YAML** in the *App build specification* panel and paste:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

Key things to verify:

- **Framework:** Vite (auto-detected — fine if it shows "React").
- **App root:** the project root (this repo only contains the app).
- **baseDirectory:** `dist` (Vite's default output folder).
- **Node version:** Amplify defaults to a recent Node 20 image, which is
  fine. To pin it, add an `.nvmrc` file at the repo root with `20` in it.

Leave **Advanced settings → Environment variables** empty — this site has
none.

### 3.4 Review and deploy

1. Click **Next**, review the summary.
2. Click **Save and deploy**.
3. Amplify provisions the app and starts the first build. You'll see four
   stages: **Provision → Build → Deploy → Verify**. The first run takes
   ~3–5 minutes.
4. When it goes green, click the URL shown (e.g.
   `https://main.d1a2b3c4e5f6g.amplifyapp.com`). The site is live.

---

## 4. Handling client-side routing (future-proofing)

Right now this is a single-page site with anchor links — no client routes —
so you don't need this section. If you later add a router (e.g. React
Router) and routes like `/projects/foo`, you'll need to redirect all paths
to `index.html` so deep links work:

In the Amplify console:
**App settings → Rewrites and redirects → Add rule**

| Source | Target | Type |
|---|---|---|
| `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>` | `/index.html` | `200 (Rewrite)` |

This catches anything that isn't a static asset and serves the SPA shell.

---

## 5. (Optional) Custom domain

If you own a domain (e.g. `paulmiddleton.com`) you can point it at the
Amplify app:

1. Amplify console → your app → **Hosting → Custom domains** → **Add domain**.
2. Type the root domain (`paulmiddleton.com`).
3. Choose the subdomain mapping — typically:
   - `paulmiddleton.com` → `main` branch
   - `www.paulmiddleton.com` → redirect to root
4. Amplify will request an ACM certificate and show DNS records you need to
   create at your registrar (or in Route 53 if your domain is there).
5. Add the CNAME / ALIAS records exactly as shown.
6. Wait — DNS validation takes anywhere from 5 minutes to an hour. Once
   green, HTTPS is live and auto-renews.

If the domain is already in **Route 53**, Amplify can add the records
automatically — it'll prompt you.

---

## 6. The day-to-day loop

After setup, your update cycle is:

```powershell
# Edit src/data/cv.js or any other file
# Test locally
npm run dev

# When happy:
git add .
git commit -m "Update experience: new role"
git push
```

Within ~3 minutes Amplify will build and deploy automatically. You can watch
progress in the Amplify console, or just refresh the live URL.

To roll back, open the Amplify console → your app → **Hosting → All builds**
→ pick a previous successful build → **Redeploy this version**.

---

## 7. Cost expectations

Amplify Hosting's free tier (refresh the AWS pricing page for current
numbers) covers a small CV site comfortably:

- Build minutes: 1,000 / month free
- Hosting bandwidth: 15 GB / month free
- Storage: 5 GB free

A personal CV site with low traffic should sit at **£0 / month**. Set up a
billing alert just in case:
**AWS Console → Billing → Budgets → Create budget → Zero-spend budget**.

---

## 8. Troubleshooting

**Build fails with `vite: not found`**
Amplify ran `npm ci` but Vite didn't install. Make sure `vite` and
`@vitejs/plugin-react` are listed under `devDependencies` in
`package.json` (they already are in this project) and that `package-lock.json`
is committed.

**Build succeeds but the site is blank**
Open browser dev tools → Console / Network. Most common causes:
- `vite.config.js` `base` is wrong. For root-domain hosting `base: './'` (the
  current setting) works. If you ever deploy under a sub-path, change `base`
  to that path with leading and trailing slashes.
- Missing `dist` artifact. Confirm `baseDirectory: dist` in the build spec.

**Push to GitHub doesn't trigger a build**
- Confirm the webhook exists: GitHub repo → **Settings → Webhooks** —
  you should see an Amplify webhook with a green tick.
- In Amplify: **App settings → Build settings → Continuous deployment** must
  be on for the `main` branch.

**HTTPS warning on custom domain**
Certificate is still validating. Give it up to an hour after creating the DNS
records. If it stalls, the DNS records are usually slightly wrong — re-paste
them exactly as Amplify shows.

**Ran out of free tier minutes**
Trim your build: add a `package-lock.json` (already committed if you ran
`npm install` once) so Amplify can use the cache, and avoid pushing tiny
edits in rapid succession.

---

## 9. Useful links

- Amplify Hosting docs: <https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html>
- Amplify build spec reference: <https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html>
- Vite deploy guide: <https://vitejs.dev/guide/static-deploy.html>
- GitHub authentication on Windows: <https://docs.github.com/en/authentication>
