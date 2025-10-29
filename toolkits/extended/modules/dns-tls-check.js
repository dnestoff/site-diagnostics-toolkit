(() => {
    console.clear();
    console.log("%c🧭 DNS & TLS Strength Overview", "font-weight:bold; color:#ff9800;");
  
    (async () => {
      const { hostname, protocol } = location;
      console.log(`Hostname: ${hostname}`);
      console.log(`Protocol: ${protocol}`);
      console.log("");
  
      const isHttps = protocol === "https:";
      console.log(`HTTPS Enabled: ${isHttps ? "✅ Yes" : "❌ No"}`);
  
      try {
        const start = performance.now();
        await fetch(location.origin, { method: "HEAD", cache: "no-store" });
        const end = performance.now();
        console.log(`Approx. Network Round Trip: ${(end - start).toFixed(1)} ms`);
      } catch {
        console.warn("⚠️ Could not perform latency test (CORS or fetch blocked).");
      }
  
      console.log("");
      console.log("🔒 Security & DNS Insights:");
      console.log(`• HSTS Policy: ${document.cookie.includes("Strict-Transport-Security") ? "✅ Present" : "⚠️ Not detectable via browser JS"}`);
      console.log("• DNSSEC: ❌ Cannot verify client-side (check via DNS tools like Cloudflare Security Center).");
      console.log("• TLS Version: Not accessible directly (use external test like Qualys SSL Labs).");
      console.log("");
  
      console.log("✅ Recommendations:");
      console.log("1. Enforce HTTPS site-wide and enable HSTS headers.");
      console.log("2. Use modern TLS (v1.3) and disable weak ciphers.");
      console.log("3. Deploy DNSSEC for verified DNS authenticity.");
      console.log("4. Consider a CDN or reverse proxy (Cloudflare, Fastly) to improve security and latency.");
      console.log("5. Validate your setup using: https://www.ssllabs.com/ssltest/");
    })();
})();
  