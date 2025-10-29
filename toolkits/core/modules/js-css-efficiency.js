(async () => {
    console.log("⚙️ Running Advanced JS & CSS Efficiency Check...\n");
  
    const summary = {
      scripts: [...document.scripts].map(s => ({
        src: s.src || "[inline]",
        async: s.async,
        defer: s.defer,
        type: s.type || "text/javascript"
      })),
      stylesheets: [...document.querySelectorAll("link[rel='stylesheet'], style")].map(s => ({
        href: s.href || "[inline]",
        media: s.media || "all"
      })),
      inlineCSSBytes: 0,
      inlineJSBytes: 0,
      totalScriptBytes: 0,
      totalCSSBytes: 0
    };
  
    // Fetch sizes of external JS and CSS files
    async function getFileSize(url) {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const len = res.headers.get("content-length");
        return len ? parseInt(len, 10) : 0;
      } catch {
        return 0;
      }
    }
  
    const fetchPromises = [];
  
    for (const script of summary.scripts) {
      if (script.src) fetchPromises.push(getFileSize(script.src).then(size => (summary.totalScriptBytes += size)));
      else summary.inlineJSBytes += script.text?.length || 0;
    }
  
    for (const sheet of summary.stylesheets) {
      if (sheet.href) fetchPromises.push(getFileSize(sheet.href).then(size => (summary.totalCSSBytes += size)));
      else summary.inlineCSSBytes += sheet.textContent?.length || 0;
    }
  
    await Promise.all(fetchPromises);
  
    // Check blocking scripts & large payloads
    const blockingScripts = summary.scripts.filter(s => !s.async && !s.defer && s.src);
    const largeScripts = summary.scripts.filter(s => s.src && s.size > 300000);
    const inlineScriptCount = summary.scripts.filter(s => s.src === "[inline]").length;
    const inlineStyleCount = summary.stylesheets.filter(s => s.href === "[inline]").length;
  
    // Count duplicated resources
    const duplicateScripts = summary.scripts
      .map(s => s.src)
      .filter(src => src && src !== "[inline]")
      .reduce((acc, src, i, arr) => {
        if (arr.indexOf(src) !== i && !acc.includes(src)) acc.push(src);
        return acc;
      }, []);
  
    // Measure runtime script usage
    const scriptEvalStart = performance.now();
    const longTasks = performance.getEntriesByType("longtask") || [];
    const jsExecTime = performance.now() - scriptEvalStart;
  
    // Inspect unused CSS (basic heuristic)
    const usedSelectors = new Set();
    [...document.querySelectorAll("*")].forEach(el => {
      if (el.classList) el.classList.forEach(cls => usedSelectors.add(`.${cls}`));
      if (el.id) usedSelectors.add(`#${el.id}`);
    });
  
    const cssRules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          if (rule.selectorText) cssRules.push(rule.selectorText);
        }
      } catch (e) {
        // Cross-origin CSS (ignored)
      }
    }
  
    const unusedSelectors = cssRules.filter(rule => ![...usedSelectors].some(sel => rule.includes(sel)));
    const unusedRatio = cssRules.length ? Math.round((unusedSelectors.length / cssRules.length) * 100) : 0;
  
    // Recommendations
    const recs = [];
  
    if (blockingScripts.length > 0)
      recs.push(`${blockingScripts.length} render-blocking scripts found — add 'defer' or 'async' attributes.`);
    if (summary.totalScriptBytes > 1000000)
      recs.push(`Total JS payload is ${(summary.totalScriptBytes / 1024).toFixed(1)} KB — consider code-splitting or tree-shaking.`);
    if (summary.totalCSSBytes > 300000)
      recs.push(`CSS payload is ${(summary.totalCSSBytes / 1024).toFixed(1)} KB — consider removing unused styles or using critical CSS.`);
    if (inlineScriptCount > 10)
      recs.push(`High number of inline scripts (${inlineScriptCount}) — move logic to separate files for caching.`);
    if (inlineStyleCount > 5)
      recs.push(`High number of inline styles (${inlineStyleCount}) — move to external stylesheets for maintainability.`);
    if (duplicateScripts.length > 0)
      recs.push(`Duplicate script imports detected:\n   - ${duplicateScripts.join("\n   - ")}`);
    if (unusedRatio > 40)
      recs.push(`Approximately ${unusedRatio}% of CSS rules appear unused — consider purging or modularizing styles.`);
    if (longTasks.length > 0)
      recs.push(`${longTasks.length} long JS tasks detected — consider async operations or web workers.`);
  
    // Output
    console.group("📊 JS & CSS Efficiency Report");
    console.log(`Total JS Files: ${summary.scripts.length}`);
    console.log(`External JS Size: ${(summary.totalScriptBytes / 1024).toFixed(1)} KB`);
    console.log(`Inline JS Bytes: ${summary.inlineJSBytes}`);
    console.log(`Total CSS Files: ${summary.stylesheets.length}`);
    console.log(`External CSS Size: ${(summary.totalCSSBytes / 1024).toFixed(1)} KB`);
    console.log(`Inline CSS Bytes: ${summary.inlineCSSBytes}`);
    console.log(`Render-blocking Scripts: ${blockingScripts.length}`);
    console.log(`Duplicate Scripts: ${duplicateScripts.length}`);
    console.log(`Unused CSS Ratio: ${unusedRatio}%`);
    console.log(`robots.txt and sitemap checks are handled separately in the SEO audit.`);
    console.groupEnd();
  
    console.group("\n✅ Recommendations");
    if (recs.length === 0) console.log("Excellent! JS and CSS resources appear efficient and well-structured. 🚀");
    else recs.forEach((r, i) => console.log(`${i + 1}. ${r}`));
    console.groupEnd();
})();
  