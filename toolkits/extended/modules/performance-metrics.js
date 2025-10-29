(() => {
    console.clear();
    console.log("%c🔍 Performance & Resource Audit", "font-weight:bold; color:#4caf50;");
  
    const perf = performance.getEntriesByType("resource");
    const slow = perf.filter(r => r.duration > 500);
    const large = perf.filter(r => r.transferSize > 500000); // >500KB
  
    console.log(`Total Requests: ${perf.length}`);
    console.log(`Slow Requests (>500ms): ${slow.length}`);
    console.log(`Large Files (>500KB): ${large.length}`);
    console.log("");
  
    if (slow.length) {
      console.group("🐢 Slow Resources:");
      slow.forEach(r => console.log(`${r.name} - ${r.duration.toFixed(1)}ms`));
      console.groupEnd();
    }
  
    if (large.length) {
      console.group("🧱 Large Files:");
      large.forEach(r => console.log(`${r.name} - ${(r.transferSize / 1024).toFixed(1)} KB`));
      console.groupEnd();
    }
  
    console.log("\n✅ Recommendations:");
    console.log("1. Compress and lazy-load large assets (images, videos).");
    console.log("2. Combine and minify JS/CSS files where possible.");
    console.log("3. Use caching headers and CDN delivery for static assets.");
})();
  