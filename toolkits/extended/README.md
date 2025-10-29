# Site Diagnostics Toolkit — Extended Environment Diagnostics

This toolkit extends the **Core Technical Diagnostics** with deeper system-level insights.  
It inspects accessibility, performance timing, storage security, PWA readiness, and DNS/TLS configuration — helping developers understand how their site behaves in real-world conditions.

---

## 🚀 Quick Start

1. Open **Chrome DevTools → Console**
2. Copy and paste the full script from `site-diagnostics-plus.js`
3. Run:
   ```js
   SiteDiagnosticsPlus.runAll();
````

4. Or execute a specific check:

   ```js
   SiteDiagnosticsPlus.run('performance');
   ```

---

## 🧰 Available Modules

| Module          | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| `accessibility` | Audits alt text, heading structure, ARIA roles, and color contrast             |
| `performance`   | Measures TTFB, DOM load, and full page load using the Performance API          |
| `storage`       | Inspects localStorage, sessionStorage, and cookies for security best practices |
| `pwa`           | Checks for Service Worker and Web App Manifest to assess PWA readiness         |
| `dnsTls`        | Tests HTTPS, DNS latency, and TLS configuration for connection health          |

---

## 💡 Example Usage

```js
// Run all diagnostics
SiteDiagnosticsPlus.runAll();

// Run individual module
SiteDiagnosticsPlus.run('pwa');
```

---

## 📊 Example Output

```
⚡ Service Worker & PWA Readiness
Service Worker registered: ✅ Yes
Active SW count: 1
Web App Manifest: ❌ Missing

✅ Recommendations:
1. Add a Web App Manifest for installability.
2. Serve over HTTPS for full PWA support.
3. Test offline caching strategy.
```

---

## 🧩 How It Works

Each module runs independently in the browser console using standard web APIs.
No external libraries, servers, or permissions are required.

---

## 🛠 Design Philosophy

* **No setup required** — runs anywhere Chrome runs
* **Completely local** — no telemetry, no external calls
* **Human-readable** — clear recommendations over scores
* **Modular by design** — each check can be extended or swapped out