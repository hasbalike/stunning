# stunning.nfts

Static site for **stunning.nfts** — a curated onchain portfolio built from two
public OpenSea profiles. No build step, no dependencies, no npm.

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | All styling (dark, aurora background, glass cards) |
| `data.js` | Wallet / collection / token data — **edit this to update** |
| `app.js` | Rendering, filtering, sorting, copy-to-clipboard, lightbox |
| `CNAME` | `stunning.nfts` — custom domain for GitHub Pages |
| `.nojekyll` | Serve files as-is, skip Jekyll processing |
| `README.md` | This guide |

---

## Deploy to GitHub Pages

### Step 1 — Push the site

The 7 files above must sit at the **repository root** (not inside a
subfolder), or Pages won't find `index.html`.

```bash
cd STUNNING
git init
git add .
git commit -m "stunning.nfts site"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

If `STUNNING` is not yet its own repo, create an empty repo on GitHub first
(no README / .gitignore), then run the above.

### Step 2 — Enable Pages

Repo → **Settings** → **Pages**

- **Source:** Deploy from a branch
- **Branch:** `main` / `(root)`
- **Save**

Wait for the green check. Your site is now live at
`https://<user>.github.io/<repo>/`.

### Step 3 — Verify the domain (do this BEFORE step 4)

Settings → Pages → **Custom domain** → GitHub shows a **DNS check** row with
two TXT values.

Go to the Freename dashboard for `stunning.nfts` → **DNS Records** and add
both, then **Save on Blockchain**:

| Type | Name | Value |
| --- | --- | --- |
| `TXT` | `_github-pages-challenge-<user>` | `<first value>` |
| `TXT` | `_github-pages-challenge.<user>.github.io` | `<second value>` |

Click **Verify** back on GitHub until the check passes.

> **Why first?** Verification proves you control the domain. Add the domain to
> GitHub *before* pointing DNS and an attacker who can write to your zone can
> claim the hostname. Verification is what prevents that.

### Step 4 — Set the custom domain on GitHub

Still in Settings → Pages → **Custom domain**, type `stunning.nfts` → **Save**.

The `CNAME` file already contains `stunning.nfts`, so GitHub may just show it
as already-configured. That's correct — nothing to change.

### Step 5 — Point Freename DNS at GitHub

Freename manages DNS **in-house** — do not delegate nameservers to GitHub.
Add these in the Freename dashboard under **DNS Records**.

**Apex (`@`) — GitHub Pages anycast IPs**

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `185.199.108.153` | 3600 |
| `A` | `@` | `185.199.109.153` | 3600 |
| `A` | `@` | `185.199.110.153` | 3600 |
| `A` | `@` | `185.199.111.153` | 3600 |

**`www` — CNAME to your Pages host**

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| `CNAME` | `www` | `<user>.github.io` | 3600 |

> The CNAME value is `<user>.github.io` — **no repo name, no `https://`, no
> trailing slash.** For an org Pages site use `<org>.github.io`.

**Optional — IPv6.** Add alongside the A records, not instead of them:

| Type | Name | Value |
| --- | --- | --- |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |

Then **Save on Blockchain**.

### Step 6 — Two things that will silently break this

**⚠️ Delete Freename's default A record.** Fresh Freename domains ship with a
default apex `A` record pointing at `34.22.218.54` (Freename's own Web3 landing
page). If it's still there it will win or conflict, and `stunning.nfts` will
show Freename's page instead of your site. Remove it.

**⚠️ No wildcard records.** Never add `*.nfts` or `*` records. A wildcard
defeats domain verification — someone could take over `anything.stunning.nfts`
even after you verify. GitHub explicitly warns against this.

Also delete any other default/auto-created records the dashboard adds.

### Step 7 — HTTPS (read this, it may not work on `.nfts`)

**A `.nfts` domain is a web3 alt-root. It is not in the public DNS root, and
that breaks TLS certificate issuance.** See the section at the bottom of this
file before assuming something is misconfigured.

If the domain is ICANN-resolvable in your setup, tick **Enforce HTTPS** in
Settings → Pages. If the domain is web3-only, use one of the two working
alternatives near the end of this file instead.

### Step 8 — Verify

```powershell
Resolve-DnsName stunning.nfts -Type A
Resolve-DnsName www.stunning.nfts -Type CNAME
```

Expect the four `185.199.108–111.153` addresses, and `www` → `<user>.github.io`.

Then open `https://stunning.nfts` in a **private window** (to bypass any local
cache). Propagation is **up to 72 hours** for Freename since records publish
on-chain.

---

## Why HTTPS fails on `stunning.nfts`

### First: NOTO and Freename DNS are different things

People mix these up constantly. They are **not** the same service:

| | Freename DNS | NOTO |
| --- | --- | --- |
| Operator | Freename AG | Noto Network (separate company) |
 | Access | Desktop/mobile installer, points your OS at Freename's resolver | DoH resolvers `34.154.40.173` / `34.154.254.177` |
| Use | Resolve your own web3 domains | Resolving *any* provider's web3 domains, incl. collisions |
 | Status | Production service | Docs say "for testing purposes… not meant to permanently replace your ISP's DNS" |

Your web3 records are written to the **Freename** zone. Whether your browser
can *look them up* is a separate question, answered by whichever resolver the
browser is using.

### The actual cause

GitHub Pages gets its certificate from **Let's Encrypt**. Let's Encrypt issues
certificates by proving domain control over the **public DNS** (HTTP-01 or
TLS-ALPN-01 challenge, both of which require the name to resolve in the normal
internet root).

`.nfts` is a blockchain alt-root. It has no delegation in the ICANN root, so:

1. Your browser can resolve `stunning.nfts` — but only because Freename's
   resolver knows the blockchain record.
2. **Let's Encrypt cannot.** It has no idea `.nfts` exists.
3. So the ACME challenge never completes, GitHub never gets a cert, and the
   domain stays HTTP-only or shows a cert error.

This is not misconfiguration. It's a structural incompatibility between
blockchain alt-root TLDs and the public CA system. GitHub's own docs concede
the limit: *"If your custom domain is unsupported, you may need to change your
domain to a supported domain."*

### Diagnose which failure you actually have

| Symptom | Cause | Fix |
| --- | --- | --- |
| `ERR_NAME_NOT_RESOLVED` | Browser isn't using a web3-capable resolver | Install the Freename DNS client, or add a browser that resolves web3 names |
| Cert error / "not private" on HTTPS | No cert issued — see above | Use one of the two options below |
| Pages shows "DNS check" stuck | Extra or conflicting records | Remove everything except the 4 `A` + the `www` `CNAME` |
| Pages shows "Certificate not yet created" | Provisioning failed | Remove the custom domain in Pages, re-add it, wait ~1h |
| `34.222.218.54` / Freename landing page | Default `A` record still present | Delete it |

### Fix A — redirect to the GitHub URL (5 minutes, works today)

Keeps GitHub Pages. The visitor lands on a page with a valid cert, but the
address bar shows `github.io`.

In the Freename dashboard for `stunning.nfts`, add a **Website redirect**
record:

| Type | Name | Value |
| --- | --- | --- |
| `WEBSITE` (redirect) | `@` | `https://<user>.github.io/<repo>/` |

Add the same for `www`. Then delete the four `A` records so nothing points at
GitHub's IPs anymore — the redirect record supersedes them.

Result: `stunning.nfts` → `https://<user>.github.io/<repo>/`, fully secure.
The site is identical; only the URL differs.

### Fix B — real HTTPS on the real domain (use Freename's hosting)

Only this gives you `https://stunning.nfts` in the address bar. It means
hosting on Freename's NeuralDNS instead of GitHub Pages, because Freename
provisions the certificate through its own CPMS proxy rather than relying on
Let's Encrypt's public validation.

You keep this exact site — `index.html`, `styles.css`, `data.js`, `app.js` are
plain static files and need no changes. Options:

- **NeuralDNS** in the Freename dashboard: upload/publish the folder, then
  connect the domain. Freename writes the apex + `www` records, routing and TLS
  for you. Per their warning, do not hand-edit those records afterwards.
- **Cloudflare Pages / Vercel** as a middle path: still public ACME, so it
  inherits the same alt-root limitation. Only worth trying if Cloudflare
  happens to serve a cert for it, which is not guaranteed.

**Pick one, never both.** Freename's connect flow deletes and rewrites the `A`
records, so a manual GitHub Pages setup will be silently clobbered.

### If you want the domain in the address bar *and* GitHub Pages

You'll need the domain mirrored as **web2** (an ICANN-registered variant).
Freename does blockchain-to-web2 mirroring for some TLDs. Check whether `.nfts`
is available as a web2 registration in your dashboard — if it is, register
`stunning.nfts` as web2 and the standard GitHub Pages HTTPS flow works exactly
as written in steps 3–7.

---



| Question | Answer |
| --- | --- |
| Delegate nameservers to GitHub? | **No.** Freename keeps DNS in-house. |
| Can I use apex `CNAME`? | **No.** Freename doesn't flatten apex CNAMEs — the four `A` records are mandatory. |
| Where is `CNAME` valid? | `www` and other subdomains only. |
| Propagation time | Up to 72h (on-chain publish) |
| Can an apex `ALIAS`/`ANAME` be used? | Not offered by Freename — use `A` records. |
| Default record to remove | `A @ 34.22.218.54` |

Doing this from an agent via MCP, once the token owns the domain:

```
list_domain_records   { "domain": "stunning.nfts" }
set_dns_record        { "domain": "stunning.nfts", "type": "A",
                        "name": "@", "value": "185.199.108.153", "ttl": 3600 }
set_dns_record        { "domain": "stunning.nfts", "type": "CNAME",
                        "name": "www", "value": "<user>.github.io", "ttl": 3600 }
```

If `list_domain_records` returns `{"dns": null, "web3": null}`, the token
isn't scoped to that domain — re-delegate in the Freename dashboard first.

---

## Alternative: skip GitHub entirely

Freename hosts sites itself via **NeuralDNS** with a CPMS proxy that writes the
apex + `www` A records, per-host routing and TLS server-side. If the GitHub
Pages route is troublesome, `neuraldns_connect_domain` does the DNS work for
you.

Per Freename's own warning: **do not also hand-edit those A records.** The
connect flow deletes and rewrites them, so manual changes get wiped or
conflict. Pick one approach — GitHub Pages or NeuralDNS, not both.

---

## Updating the portfolio

Edit the `WALLETS` array in `data.js`. Each collection is one object:

```js
{
  name: "Collection Name",
  slug: "opensea-slug",   // used for the outbound OpenSea link
  category: "ART",        // ART | PFPS | GAMING | MEMBERSHIPS | OTHER
  count: 7,               // items held
  usd: 1939.53,           // total floor value held
  chain: "ethereum",
  contract: "0x…",
  image: "https://…"
}
```

New categories appear in the filter bar automatically. Commit and push — the
site rebuilds in about a minute.

## Wallets featured

| Wallet | NFTs | Collections | NFT value |
| --- | --- | --- | --- |
| `0xd83ceeb78c3b94eda193a34c1298847afc5b89ba` | 104 | 20 | $4,850.74 |
| `0x6d172b55c95393285a1750da13b9c4bf968e4ea2` | 5 | 2 | $45.16 |
| **Total** | **109** | **22** | **$4,895.90** |

## Notes

- Collection art is hot-linked from OpenSea's CDN (`i2c.seadn.io`); token logos
  from `raw2.seadn.io`. Nothing is stored in the repo.
- Values are a static snapshot. The site makes **no API calls**, so it stays
  fast and free to host. To refresh, re-pull the numbers and update `data.js`.
- Not investment advice. Onchain data is public and always changing.
