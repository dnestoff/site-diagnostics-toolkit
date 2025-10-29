(async () => {
    console.log("🧱 Enhanced Third-Party & Dependency Risk Report\n");
  
    const resources = performance.getEntriesByType("resource");
    const origin = location.hostname;
  
    // Group resources by domain
    const domainMap = {};
    for (const r of resources) {
      try {
        const domain = new URL(r.name).hostname;
        if (!domainMap[domain]) domainMap[domain] = [];
        domainMap[domain].push(r);
      } catch (e) {}
    }
  
    // Categorization rules
    const categorize = domain => {
      const d = domain.toLowerCase();
      if (d.includes("googletagmanager") || d.includes("analytics")) return "Analytics / Tracking";
      if (d.includes("doubleclick") || d.includes("adservice") || d.includes("ads")) return "Advertising / AdTech";
      if (d.includes("facebook") || d.includes("tiktok") || d.includes("twitter") || d.includes("linkedin")) return "Social Media Integration";
      if (d.includes("font") || d.includes("gstatic") || d.includes("cdn") || d.includes("cloudflare")) return "Asset CDN / Font Hosting";
      if (d.includes("api") || d.includes("auth") || d.includes("maps")) return "External API / Auth Service";
      if (d.includes(origin)) return "First-Party";
      return "Unclassified";
    };
  
    const report = Object.entries(domainMap).map(([domain, entries]) => {
      const totalBytes = entries.reduce((sum, e) => sum + e.transferSize, 0);
      const avgDuration = (entries.reduce((sum, e) => sum + e.duration, 0) / entries.length).toFixed(2);
      const types = [...new Set(entries.map(e => e.initiatorType))].join(", ");
      const risk =
        categorize(domain) === "Advertising / AdTech" || categorize(domain) === "Analytics / Tracking"
          ? "⚠️ High"
          : categorize(domain) === "External API / Auth Service" || categorize(domain) === "Social Media Integration"
          ? "⚠ Medium"
          : "✅ Low";
  
      return {
        Domain: domain,
        Category: categorize(domain),
        Requests: entries.length,
        Types: types,
        SizeKB: (totalBytes / 1024).toFixed(1),
        AvgLatencyMS: avgDuration,
        Risk: risk,
      };
    });
  
    // Split into first-party and third-party
    const firstParty = report.filter(r => r.Category === "First-Party");
    const thirdParty = report.filter(r => r.Category !== "First-Party");
  
    console.group("📦 Dependency Breakdown");
    console.table(report.sort((a, b) => b.SizeKB - a.SizeKB));
    console.groupEnd();
  
    console.log(`\nTotal Domains: ${report.length}`);
    console.log(`Third-Party Domains: ${thirdParty.length}`);
    console.log(`First-Party Domains: ${firstParty.length}`);
  
    const highRisk = thirdParty.filter(r => r.Risk.includes("High"));
    const mediumRisk = thirdParty.filter(r => r.Risk.includes("Medium"));
  
    console.group("\n⚠️ Risk Summary");
    console.log(`High-Risk Dependencies: ${highRisk.length}`);
    console.log(`Medium-Risk Dependencies: ${mediumRisk.length}`);
    console.groupEnd();
  
    // Recommendations
    console.group("\n✅ Recommendations");
    if (highRisk.length > 0) {
      console.log("1. Review analytics, ad, and social scripts for data leakage and consent compliance.");
      console.log("2. Load heavy or third-party scripts asynchronously or via tag manager with deferral.");
      console.log("3. Consider self-hosting fonts or critical scripts to eliminate external calls.");
      console.log("4. Audit all APIs for authentication and rate-limit security.");
      console.log("5. Add Subresource Integrity (SRI) checks for CDN-hosted assets.");
      console.log("6. Use Content-Security-Policy (CSP) to strictly whitelist trusted domains.");
    } else {
      console.log("✅ No high-risk dependencies detected — external footprint is minimal.");
    }
    console.groupEnd();
  
    // Optional: Generate domain performance totals
    const totalThirdPartyKB = thirdParty.reduce((sum, r) => sum + parseFloat(r.SizeKB), 0).toFixed(1);
    console.log(`\n💾 Total Third-Party Payload: ${totalThirdPartyKB} KB`);
})();
  