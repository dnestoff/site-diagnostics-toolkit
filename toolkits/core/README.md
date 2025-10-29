
# 🧠 Site Diagnostics Toolkit — Core Technical Diagnostics

A lightweight, console-based **Lighthouse alternative** for developers who want fast, local insights into page performance, SEO, and security — all without leaving the Chrome DevTools console.

This toolkit runs entirely client-side (no dependencies or installs) and provides actionable recommendations in plain English.

---

## 🚀 Quick Start

1. Open **Chrome DevTools → Console**
2. Copy and paste the full script from `site-diagnostics-core.js`
3. Run:
   ```js
   SiteDiagnostics.runAll();
````

4. Or execute a specific module:

   ```js
   SiteDiagnostics.run('seo');
   ```

---

## 🧰 Available Modules

| Module           | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| `seo`            | Analyzes titles, meta tags, canonical URLs, Open Graph data, and link integrity       |
| `jsCss`          | Evaluates JS and CSS payloads, unused code, and render-blocking resources             |
| `dependencies`   | Audits third-party scripts and library dependencies for bloat and risk                |
| `security`       | Checks HTTPS, headers (CSP, HSTS, X-Frame-Options), and other security best practices |
| `thirdPartyRisk` | Detects embedded analytics, ads, and tag managers for potential data exposure         |

---

## 💡 Example Usage

```js
// Full scan
SiteDiagnostics.runAll();

// Single check
SiteDiagnostics.run('security');
```

Console output is color-coded and grouped by category, making it easy to scan and share results.

---

## 📊 Example Output

```
📈 SEO & Link Health Audit
Title: Home :: Example Site
Meta Description: Example of a simple meta description.
Canonical URL: ✅ Present

✅ Recommendations:
1. Add Open Graph and Twitter Card meta tags.
2. Ensure every page has a canonical URL.
3. Use concise, keyword-rich descriptions.
```

---

## 🛠 Design Philosophy

* **Zero setup** — paste and run in Chrome DevTools
* **Privacy-first** — no data leaves your browser
* **Readable insights** — no scores, just clear guidance
* **Composable** — add your own modules easily

---

## 🧩 Future Ideas

* Performance budget reporting
* JS bundle analyzer integration
* Accessibility scan integration with toolkit B

---

## 🪪 License

MIT License © 2025 — Created by [Your Name or Org]

---

**Keywords:** JavaScript, Chrome DevTools, SEO Audit, Web Performance, Security Audit, Lighthouse Alternative