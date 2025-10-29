const SiteDiagnostics = (() => {
    console.log("%c🔍 Site Diagnostics Toolkit v1.0", "color: cyan; font-weight: bold;");
  
    // Utility helpers
    const utils = {
      toKB: bytes => (bytes / 1024).toFixed(1),
      colorLog: (msg, color = "white") => console.log(`%c${msg}`, `color: ${color}`),
    };
  
    /* -------------------------------------------------------------------------- */
    /*                               1. SEO & Link Audit                          */
    /* -------------------------------------------------------------------------- */
    const seo = () => {
      console.group("📈 SEO & Link Health Audit");
      const title = document.title || "❌ Missing title";
      const desc = document.querySelector('meta[name="description"]')?.content || "❌ Missing description";
      const canonical = document.querySelector('link[rel="canonical"]')?.href || "❌ Missing";
      const og = document.querySelector('meta[property="og:title"]') ? "✅ Present" : "❌ Missing";
      const tw = document.querySelector('meta[name="twitter:card"]') ? "✅ Present" : "❌ Missing";
      const links = [...document.querySelectorAll("a")];
      const external = links.filter(a => a.href && !a.href.includes(location.hostname));
      const nofollow = links.filter(a => a.rel?.includes("nofollow"));
  
      console.log("Title:", title);
      console.log("Meta Description:", desc);
      console.log("Canonical URL:", canonical);
      console.log("OpenGraph:", og, "| Twitter Card:", tw);
      console.log(`Total Links: ${links.length}, External: ${external.length}, Nofollow: ${nofollow.length}`);
  
      console.group("✅ Recommendations");
      console.log("1. Add concise, keyword-rich meta descriptions.");
      console.log("2. Ensure every page has a canonical URL.");
      console.log("3. Include OpenGraph and Twitter Card tags for social sharing.");
      console.log("4. Use 'nofollow' on untrusted external links.");
      console.groupEnd();
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                          2. JS & CSS Efficiency Check                      */
    /* -------------------------------------------------------------------------- */
    const jsCss = () => {
      console.group("⚙️ JS & CSS Efficiency Check");
      const scripts = [...document.scripts].filter(s => s.src);
      const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')];
      const inlineScripts = [...document.scripts].filter(s => !s.src);
      const inlineCSS = [...document.querySelectorAll("style")];
  
      const scriptBytes = performance.getEntriesByType("resource")
        .filter(r => r.initiatorType === "script")
        .reduce((a, b) => a + b.transferSize, 0);
      const cssBytes = performance.getEntriesByType("resource")
        .filter(r => r.initiatorType === "link")
        .reduce((a, b) => a + b.transferSize, 0);
  
      console.log(`External JS: ${scripts.length} | Inline JS blocks: ${inlineScripts.length}`);
      console.log(`External CSS: ${stylesheets.length} | Inline CSS blocks: ${inlineCSS.length}`);
      console.log(`JS Size: ${utils.toKB(scriptBytes)} KB | CSS Size: ${utils.toKB(cssBytes)} KB`);
  
      console.group("✅ Recommendations");
      console.log("1. Combine and minify JS/CSS files to reduce network requests.");
      console.log("2. Lazy-load non-critical scripts (analytics, widgets).");
      console.log("3. Inline only critical CSS; defer the rest.");
      console.log("4. Remove unused CSS/JS (use Chrome Coverage tab).");
      console.log("5. Audit large vendor bundles or libraries (>100KB).");
      console.groupEnd();
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                    3. Third-Party & Dependency Risk Report                 */
    /* -------------------------------------------------------------------------- */
    const dependencies = async () => {
      console.group("🧱 Third-Party & Dependency Risk Report");
  
      const resources = performance.getEntriesByType("resource");
      const origin = location.hostname;
      const domainMap = {};
  
      for (const r of resources) {
        try {
          const domain = new URL(r.name).hostname;
          if (!domainMap[domain]) domainMap[domain] = [];
          domainMap[domain].push(r);
        } catch (e) {}
      }
  
      const categorize = domain => {
        const d = domain.toLowerCase();
        if (d.includes("googletagmanager") || d.includes("analytics")) return "Analytics / Tracking";
        if (d.includes("doubleclick") || d.includes("adservice") || d.includes("ads")) return "Advertising / AdTech";
        if (d.includes("facebook") || d.includes("tiktok") || d.includes("twitter") || d.includes("linkedin")) return "Social Media Integration";
        if (d.includes("font") || d.includes("cdn") || d.includes("gstatic") || d.includes("cloudflare")) return "Asset CDN / Font Hosting";
        if (d.includes("api") || d.includes("auth") || d.includes("maps")) return "External API / Auth Service";
        if (d.includes(origin)) return "First-Party";
        return "Unclassified";
      };
  
      const report = Object.entries(domainMap).map(([domain, entries]) => {
        const totalBytes = entries.reduce((sum, e) => sum + e.transferSize, 0);
        const avgDuration = (entries.reduce((sum, e) => sum + e.duration, 0) / entries.length).toFixed(2);
        const types = [...new Set(entries.map(e => e.initiatorType))].join(", ");
        const cat = categorize(domain);
        const risk = cat.includes("Ad") || cat.includes("Tracking") ? "⚠️ High" : cat.includes("API") ? "⚠ Medium" : "✅ Low";
        return { Domain: domain, Category: cat, Requests: entries.length, Types: types, SizeKB: utils.toKB(totalBytes), AvgLatencyMS: avgDuration, Risk: risk };
      });
  
      console.table(report.sort((a, b) => b.SizeKB - a.SizeKB));
      const highRisk = report.filter(r => r.Risk.includes("High")).length;
      console.group("✅ Recommendations");
      console.log("1. Review analytics/ad/social scripts for compliance.");
      console.log("2. Use async/defer for heavy external scripts.");
      console.log("3. Add Subresource Integrity (SRI) for CDN assets.");
      console.log("4. Implement a strict Content-Security-Policy (CSP).");
      console.log(`Total High-Risk Dependencies: ${highRisk}`);
      console.groupEnd();
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                             4. Security Headers Audit                      */
    /* -------------------------------------------------------------------------- */
    const security = async () => {
      console.group("🔐 Security Headers Audit");
      const response = await fetch(location.href, { method: "HEAD" });
      const headers = Object.fromEntries(response.headers.entries());
      console.table(headers);
  
      const mustHave = ["content-security-policy", "x-frame-options", "x-content-type-options", "strict-transport-security", "referrer-policy"];
      const missing = mustHave.filter(h => !headers[h]);
      if (missing.length) console.warn("❌ Missing:", missing.join(", "));
      else console.log("✅ All critical security headers are present.");
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                               Registry of Modules                          */
    /* -------------------------------------------------------------------------- */
    const modules = { seo, jsCss, dependencies, security };
  
    const run = name => {
      const mod = modules[name];
      if (!mod) return console.error(`❌ Unknown module: ${name}`);
      console.log(`\n\n🚀 Running module: ${name.toUpperCase()}`);
      return mod();
    };
  
    const runAll = async () => {
      for (const name of Object.keys(modules)) await run(name);
      utils.colorLog("\n🏁 Diagnostics Complete", "lightgreen");
    };
  
    return { run, runAll, list: () => Object.keys(modules) };
  })();
  