/* stunning.nfts — rendering + interactions */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const usd = (n) =>
    n >= 1000
      ? "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const allCollections = WALLETS.flatMap((w) =>
    w.collections.map((c) => ({ ...c, wallet: w.id }))
  );

  const sum = (arr, f) => arr.reduce((a, x) => a + f(x), 0);
  const totals = {
    nfts: sum(allCollections, (c) => c.count),
    collections: allCollections.length,
    nftValue: sum(allCollections, (c) => c.usd),
    tokenValue: sum(WALLETS, (w) => sum(w.tokens, (t) => t.usd))
  };

  const seUrl = (addr) => "https://opensea.io/" + addr;

  /* chain -> { explorer, eip681 chain id } — only entries we're certain about */
  const CHAINS = {
    ethereum: { explorer: "https://etherscan.io/address/", eip681: "1" },
    base: { explorer: "https://basescan.org/address/", eip681: "8453" }
  };

  const explorerUrl = (addr) => {
    const c = CHAINS.ethereum;
    return c ? c.explorer + addr : null;
  };
  const paymentUri = (addr, chainId) =>
    "ethereum:" + addr + (chainId ? "@" + chainId : "");

  /* ---------- hero stats: count up ---------- */
  function countUp(el, target, money) {
    const dur = 1200;
    const t0 = performance.now();
    const fmt = (v) => (money ? usd(v) : Math.round(v).toLocaleString("en-US"));
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function renderStats() {
    const map = {
      nfts: [totals.nfts, false],
      collections: [totals.collections, false],
      nftValue: [totals.nftValue, true],
      tokenValue: [totals.tokenValue, true]
    };
    document.querySelectorAll("[data-stat]").forEach((el) => {
      const [v, m] = map[el.dataset.stat];
      countUp(el, v, m);
    });
  }

  /* ---------- wallets ---------- */
  function renderWallets() {
    $("#walletGrid").innerHTML = WALLETS.map(
      (w) => `
      <article class="wallet reveal">
        <div class="w-top">
          <div class="w-id">
            <span class="w-label">${w.label}</span>
            <span class="w-addr">${w.short}</span>
            ${w.username ? `<span class="w-user">@${w.username}</span>` : ""}
          </div>
        </div>
        <div class="w-stats">
          <div class="w-stat"><b>${w.collections.length}</b><span>Collections</span></div>
          <div class="w-stat"><b>${sum(w.collections, (c) => c.count)}</b><span>NFTs</span></div>
          <div class="w-stat"><b>${usd(sum(w.collections, (c) => c.usd))}</b><span>NFT value</span></div>
        </div>
        <div class="w-actions">
          <a class="w-act" href="${seUrl(w.address)}" target="_blank" rel="noopener">OpenSea ↗</a>
          ${explorerUrl(w.address)
            ? `<a class="w-act" href="${explorerUrl(w.address)}" target="_blank" rel="noopener">Explorer ↗</a>`
            : ""}
          <a class="w-act pay" href="${paymentUri(w.address, CHAINS.ethereum.eip681)}" title="Open in a wallet app to send ETH">Pay</a>
          <button class="w-act w-copy" data-copy="${w.address}" title="Copy address">Copy</button>
        </div>
      </article>`
    ).join("");
  }

  /* ---------- collections: filter + sort ---------- */
  const CATS = ["All", ...new Set(allCollections.map((c) => c.category))];
  let active = "All";
  let sortBy = "usd";

  function renderFilters() {
    $("#filters").innerHTML = CATS.map(
      (c) => `<button class="chip" data-cat="${c}" aria-pressed="${c === active}">${c}</button>`
    ).join("");
  }

  function renderCards() {
    let list = allCollections.filter((c) => active === "All" || c.category === active);
    list.sort((a, b) =>
      sortBy === "name" ? a.name.localeCompare(b.name) : b[sortBy] - a[sortBy]
    );

    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    $("#cards").innerHTML = list
      .map(
        (c) => `
      <article class="card reveal" data-slug="${esc(c.slug)}">
        <button class="thumb" type="button" aria-label="Enlarge ${esc(c.name)}">
          <span class="badge">${esc(c.category)}</span>
          <img loading="lazy" alt="${esc(c.name)}" data-src="${esc(c.image)}" />
          <span class="thumb-usd">${usd(c.usd)}</span>
        </button>
        <div class="c-body">
          <div class="c-name">${esc(c.name)}</div>
          <div class="c-meta">
            <span class="c-count">${c.count} item${c.count === 1 ? "" : "s"}</span>
            <span class="c-chain">${esc(c.chain)}</span>
          </div>
          <a class="c-link" href="https://opensea.io/collection/${encodeURIComponent(c.slug)}" target="_blank" rel="noopener">OpenSea ↗</a>
        </div>
      </article>`
      )
      .join("");

    $("#emptyMsg").hidden = list.length > 0;
    hydrateImages();
    observeReveals();
  }

  /* ---------- tokens ---------- */
  function renderTokens() {
    $("#tokenList").innerHTML = WALLETS.map(
      (w) => `
      <div class="tgroup reveal">
        <h4>${w.short}</h4>
        ${w.tokens
          .map(
            (t) => `
          <div class="trow">
            <img loading="lazy" src="${t.icon}" alt="" onerror="this.style.visibility='hidden'" />
            <div>
              <div class="t-name">${t.name}</div>
              <div class="t-sym">${t.symbol} · ${t.chain}</div>
            </div>
            <div class="t-right">
              <div class="t-usd">${usd(t.usd)}</div>
              <div class="t-qty">${t.qty}</div>
            </div>
            ${
              CHAINS[t.chain] && t.tokenAddress
                ? `<a class="t-ext" href="${CHAINS[t.chain].explorer}${t.tokenAddress}" target="_blank" rel="noopener" aria-label="View ${t.symbol} contract">↗</a>`
                : ""
            }
          </div>`
          )
          .join("")}
      </div>`
    ).join("");
  }

  /* ---------- lazy image fade ---------- */
  function hydrateImages() {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      if (img.dataset.done) return;
      img.dataset.done = "1";
      const s = img.dataset.src;
      delete img.dataset.src;
      img.addEventListener("load", () => img.classList.add("ready"), { once: true });
      img.addEventListener("error", () => img.classList.add("ready"), { once: true });
      img.src = s;
    });
  }

  /* ---------- scroll reveal ---------- */
  let io;
  function observeReveals() {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en, i) => {
            if (!en.isIntersecting) return;
            setTimeout(() => en.target.classList.add("in"), Math.min(i * 45, 400));
            io.unobserve(en.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
    }
    document.querySelectorAll(".reveal:not(.in)").forEach((e) => io.observe(e));
  }

  /* ---------- lightbox ---------- */
  function wireLightbox() {
    const lb = $("#lightbox"),
      img = $("#lbImg"),
      cap = $("#lbCap");
    const close = () => (lb.hidden = true);

    $("#cards").addEventListener("click", (e) => {
      if (e.target.closest(".c-link")) return;
      const card = e.target.closest(".card");
      if (!card) return;
      const im = card.querySelector("img");
      const name = card.querySelector(".c-name").textContent;
      img.src = im.currentSrc || im.src;
      cap.textContent = name;
      lb.hidden = false;
    });

    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.id === "lbClose") close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lb.hidden) close();
    });
  }

  /* ---------- events ---------- */
  function wireEvents() {
    $("#filters").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      active = chip.dataset.cat;
      document
        .querySelectorAll(".chip")
        .forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      renderCards();
    });

    $("#sortBy").addEventListener("change", (e) => {
      sortBy = e.target.value;
      renderCards();
    });

    document.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      const addr = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(addr);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = addr;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      btn.textContent = "Copied";
      btn.classList.add("done");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("done");
      }, 1600);
    });
  }

  /* ---------- init ---------- */
  renderStats();
  renderWallets();
  renderFilters();
  renderCards();
  renderTokens();
  wireEvents();
  wireLightbox();
})();
