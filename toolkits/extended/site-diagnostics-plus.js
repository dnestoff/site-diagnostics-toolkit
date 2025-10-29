const SiteDiagnosticsPlus = (() => {
    console.log("%c🌐 Site Diagnostics Toolkit — Extended Environment v1.0", "color: lightgreen; font-weight: bold;");
  
    const utils = {
      colorLog: (msg, color = "white") => console.log(`%c${msg}`, `color: ${color}`),
      toKB: bytes => (bytes / 1024).toFixed(1),
    };
  
    /* -------------------------------------------------------------------------- */
    /*                          1. Accessibility & ARIA Audit                     */
    /* -------------------------------------------------------------------------- */
    const accessibility = () => {
      console.group("♿ Accessibility & ARIA Audit");
      const imgs = [...document.querySelectorAll("img")];
      const missingAlt = imgs.filter(img => !img.alt || img.alt.trim() === "");
      const roles = [...document.querySelectorAll("[role]")].length;
      const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
      const contrastIssues = [];
  
      // Basic color contrast check (approx)
      document.querySelectorAll("*").forEach(el => {
        const color = getComputedStyle(el).color;
        const bg = getComputedStyle(el).backgroundColor;
        if (color === bg && color !== "rgba(0, 0, 0, 0)") {
          contrastIssues.push(el);
        }
      });
  
      console.log(`Images: ${imgs.length}, Missing alt: ${missingAlt.length}`);
      console.log(`Elements with ARIA roles: ${roles}`);
      console.log(`Headings found: ${headings.length}`);
      console.log(`Potential color contrast issues: ${contrastIssues.length}`);
  
      console.group("✅ Recommendations");
      console.log("1. Add alt text to all images.");
      console.log("2. Ensure heading hierarchy (H1 → H2 → H3).");
      console.log("3. Add ARIA roles and labels where appropriate.");
      console.log("4. Improve color contrast between text and background.");
      console.groupEnd();
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                          2. Performance Timing Overview                    */
    /* -------------------------------------------------------------------------- */
    const performanceTiming = () => {
      console.group("⏱ Performance Timing Overview");
      const perf = performance.timing;
      const ttfb = perf.responseStart - perf.requestStart;
      const domLoad = perf.domContentLoadedEventEnd - perf.navigationStart;
      const totalLoad = perf.loadEventEnd - perf.navigationStart;
  
      console.log(`TTFB: ${ttfb} ms`);
      console.log(`DOM Load: ${domLoad} ms`);
      console.log(`Total Page Load: ${totalLoad} ms`);
  
      console.group("✅ Recommendations");
      console.log("1. Aim for TTFB < 200ms.");
      console.log("2. Defer non-critical scripts and styles.");
      console.log("3. Optimize images (use WebP/AVIF).");
      console.log("4. Enable HTTP/2 or HTTP/3 for parallel loading.");
      console.groupEnd();
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                          3. Storage & Cookie Policy Check                  */
    /* -------------------------------------------------------------------------- */
    const storageCheck = () => {
      console.group("🍪 Storage & Cookie Policy Check");
      const localKeys = Object.keys(localStorage);
      const sessionKeys = Object.keys(sessionStorage);
      const cookies = document.cookie.split(";").filter(Boolean);
  
      console.log(`LocalStorage Keys: ${localKeys.length}`);
      console.log(`SessionStorage Keys: ${sessionKeys.length}`);
      console.log(`Cookies: ${cookies.length}`);
  
      const cookieFlags = cookies.map(c => {
        const parts = c.split("=");
        const name = parts[0].trim();
        return { name, secure: c.includes("Secure"), httpOnly: c.includes("HttpOnly"), sameSite: c.includes("SameSite") };
      });
      console.table(cookieFlags);
  
      console.group("✅ Recommendations");
      console.log("1. Add 'Secure' and 'HttpOnly' flags to all cookies.");
      console.log("2. Implement 'SameSite=Strict' to prevent CSRF.");
      console.log("3. Use IndexedDB for large data instead of localStorage.");
      console.log("4. Avoid storing tokens or secrets in browser storage.");
      console.groupEnd();
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                          4. Service Worker / PWA Readiness                 */
    /* -------------------------------------------------------------------------- */
    const pwa = async () => {
      console.group("⚡ Service Worker & PWA Readiness");
      const hasSW = 'serviceWorker' in navigator;
      const reg = hasSW ? await navigator.serviceWorker.getRegistrations() : [];
      const manifest = document.querySelector('link[rel="manifest"]');
  
      console.log(`Service Worker registered: ${hasSW ? "✅ Yes" : "❌ No"}`);
      console.log(`Active SW count: ${reg.length}`);
      console.log(`Web App Manifest: ${manifest ? "✅ Present" : "❌ Missing"}`);
  
      console.group("✅ Recommendations");
      console.log("1. Register a service worker for offline caching.");
      console.log("2. Add a Web App Manifest for installability.");
      console.log("3. Serve over HTTPS for full PWA support.");
      console.log("4. Test PWA install via Chrome DevTools → Application tab.");
      console.groupEnd();
      console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                          5. DNS / TLS Strength Overview                    */
    /* -------------------------------------------------------------------------- */
    const dnsTls = async () => {
      console.group("🧭 DNS & TLS Strength Overview");
      const { hostname, protocol } = location;
      const isHttps = protocol === "https:";
      console.log(`Hostname: ${hostname}`);
      console.log(`Protocol: ${protocol}`);
  
      try {
        const start = performance.now();
        await fetch(location.origin, { method: "HEAD" });
        const end = performance.now();
        console.log(`Network round-trip: ${(end - start).toFixed(1)} ms`);
      } catch {
        console.warn("⚠️ Could not measure DNS/TLS latency (CORS restrictions).");
      }
  
      console.group("✅ Recommendations");
      console.log("1. Use HTTPS everywhere (HSTS policy enabled).");
      console.log("2. Deploy DNSSEC for domain authenticity.");
      console.log("3. Use modern TLS (v1.3) with strong ciphers.");
      console.log("4. Verify CDN or reverse proxy configurations.");
      console.groupEnd();
      console.groupEnd();
    };

    /* -------------------------------------------------------------------------- */
    /*                       6. Subresource Integrity (SRI) Check                 */
    /* -------------------------------------------------------------------------- */
    const sriCheck = () => {
        console.group("🔒 Subresource Integrity (SRI) Check");

        const scripts = Array.from(document.querySelectorAll("script[src]"));
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"][href]'));

        const externalResources = [...scripts, ...styles].filter(el => {
        const src = el.src || el.href;
        if (!src) return false;
        return !src.startsWith(location.origin) && !src.startsWith("/") && !src.startsWith("./");
        });

        const results = externalResources.map(el => ({
        type: el.tagName.toLowerCase() === "script" ? "JavaScript" : "CSS",
        url: el.src || el.href,
        hasIntegrity: !!el.getAttribute("integrity"),
        hasCrossorigin: !!el.getAttribute("crossorigin")
        }));

        const missingIntegrity = results.filter(r => !r.hasIntegrity);
        const missingCrossorigin = results.filter(r => !r.hasCrossorigin);

        console.log(`🌐 Total External Resources: ${results.length}`);
        console.log(`❌ Missing integrity: ${missingIntegrity.length}`);
        console.log(`⚠️ Missing crossorigin: ${missingCrossorigin.length}`);
        console.log("");

        if (missingIntegrity.length > 0) {
        console.groupCollapsed("❌ Missing Integrity Attribute");
        missingIntegrity.forEach(r => console.log(`${r.type}: ${r.url}`));
        console.groupEnd();
        }

        if (missingCrossorigin.length > 0) {
        console.groupCollapsed("⚠️ Missing Crossorigin Attribute");
        missingCrossorigin.forEach(r => console.log(`${r.type}: ${r.url}`));
        console.groupEnd();
        }

        console.group("✅ Recommendations");
        console.log("1. Add 'integrity' attributes for all external JS and CSS files.");
        console.log("2. Include 'crossorigin=\"anonymous\"' when using SRI.");
        console.log("3. Use https://www.srihash.org or 'npm srihash' to generate hashes.");
        console.log("4. Host critical resources locally or pin to specific versions.");
        console.log("5. Avoid inline <script> tags for untrusted third-party content.");
        console.groupEnd();

        if (missingIntegrity.length === 0 && missingCrossorigin.length === 0) {
        console.log("✅ All external scripts and styles include integrity and crossorigin attributes.");
        } else {
        console.warn("⚠️ Some external resources are missing integrity or crossorigin attributes. Review recommended fixes above.");
        }

        console.groupEnd();
    };
  
    /* -------------------------------------------------------------------------- */
    /*                               Registry of Modules                          */
    /* -------------------------------------------------------------------------- */
    const modules = { accessibility, performance: performanceTiming, storage: storageCheck, pwa, dnsTls, sri: sriCheck };
  
    const run = async name => {
      const mod = modules[name];
      if (!mod) return console.error(`❌ Unknown module: ${name}`);
      console.log(`\n\n🚀 Running module: ${name.toUpperCase()}`);
      await mod();
    };
  
    const runAll = async () => {
      for (const name of Object.keys(modules)) await run(name);
      utils.colorLog("\n🏁 Extended Diagnostics Complete", "lightgreen");
    };
  
    return { run, runAll, list: () => Object.keys(modules) };
})();
  