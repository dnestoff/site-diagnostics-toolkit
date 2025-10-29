# 🧭 Site Diagnostics Toolkit

> **A modular JavaScript suite for in-browser website diagnostics** — built to give developers deep, actionable insights right from the Chrome DevTools console.

This repository contains **two independent toolkits** for analyzing websites:  
1. **Core Technical Diagnostics** — foundational audits of site health, performance, and dependencies.  
2. **Extended Environment Diagnostics** — deeper checks for security, PWA readiness, and environmental integrity.

Both toolkits can be run directly inside the browser console on any page, giving you a **fast, privacy-friendly alternative to Lighthouse** for quick audits.

---

## Toolkit Overview

### [Core Technical Diagnostics](toolkits/core/README.md)
Focuses on the **structural and technical health** of a website.

| Module | Purpose |
|--------|----------|
| `seo-audit.js` | Audits SEO metadata, link integrity, and crawl readiness |
| `js-css-efficiency.js` | Analyzes JavaScript and CSS usage, weight, and redundancy |
| `security-audit.js` | Flags missing security headers, unsafe patterns, and mixed content |
| `third-party-and-dependency-risk.js` | Detects external services, trackers, and dependency vulnerabilities |

[View Core Toolkit →](toolkits/core)

---

### [Extended Environment Diagnostics](toolkits/extended/README.md)
Expands your analysis to **broader environmental and configuration checks**.

| Module | Purpose |
|--------|----------|
| `accessibility-audit.js` | Tests accessibility compliance and DOM semantics |
| `performance-metrics.js` | Profiles key performance and rendering metrics |
| `storage-security.js` | Reviews cookie, localStorage, and sessionStorage risks |
| `pwa-readiness.js` | Evaluates installability, service workers, and manifest integrity |
| `dns-tls-check.js` | Checks HTTPS, HSTS, and DNSSEC configurations |

📂 [View Extended Toolkit →](toolkits/extended)

---

## 🚀 Quick Start

You can run any diagnostic directly in your Chrome DevTools console:

1. Open any website you’d like to analyze.  
2. Open **Developer Tools → Console**.  
3. Copy a module’s contents (for example, `seo-audit.js`) and paste it into the console.  
4. Press **Enter** to run the audit.  
5. Review the console output and recommendations.

Alternatively, you can load an entire toolkit:
```javascript
// Load the Core Toolkit (all 5 modules)
import('https://yourdomain.com/site-diagnostics/toolkits/core/site-diagnostics-core.js')

// Or load the Extended Toolkit
import('https://yourdomain.com/site-diagnostics/toolkits/extended/site-diagnostics-plus.js')
````

*(Local file URLs work too, e.g., `file:///Users/you/site-diagnostics/toolkits/core/site-diagnostics-core.js`)*

---

## Example Outputs

Each module comes with a sample output file showing typical findings and suggested optimizations:

* [Core Toolkit Examples](toolkits/core/examples)
* [Extended Toolkit Examples](toolkits/extended/examples)

These Markdown examples mirror the real console results — ideal for documentation or team reviews.

---

## ⚙️ Structure Overview

```
site-diagnostics/
├── toolkits/
│   ├── core/
│   │   ├── modules/
│   │   ├── examples/
│   │   ├── utils/
│   │   └── README.md
│   └── extended/
│       ├── modules/
│       ├── examples/
│       ├── utils/
│       └── README.md
├── docs/
├── scripts/
└── README.md  ← (this file)
```

---

## 🧩 Development

To customize or extend:

1. Add new diagnostics to the appropriate `modules/` folder.
2. Reference them in the corresponding `site-diagnostics-core.js` or `site-diagnostics-plus.js`.
3. Use the helper utilities in `utils/` for consistent console formatting.

To bundle all modules into a single file:

```bash
npm run bundle:core
npm run bundle:extended
```

---

## 🛡️ Philosophy

> “Diagnostics should be fast, local, and transparent.”

Unlike many audit tools, **Site Diagnostics** runs entirely client-side.
No data leaves your browser — every test executes in memory and reports directly to the console.

---

## 🧭 Roadmap

* [ ] Add visual HTML overlay for highlighted problem areas
* [ ] Implement Chrome extension version
* [ ] Include export-to-JSON/Markdown functionality
* [ ] Add CI/CD integration (Node or GitHub Action support)

---

## 🧠 Credits & License

Created with ❤️ by developers who love readable audits.
Licensed under the **MIT License** — open for collaboration.

---

> 📬 **Feedback Welcome:**
> Open an issue or PR if you have new diagnostic ideas or enhancements.