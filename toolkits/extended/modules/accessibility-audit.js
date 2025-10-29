(() => {
    console.clear();
    console.log("%c♿ Accessibility & Semantics Report", "font-weight:bold; color:#2196f3;");
  
    const imgs = [...document.querySelectorAll("img")];
    const missingAlt = imgs.filter(img => !img.alt);
  
    const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
    const h1Count = document.querySelectorAll("h1").length;
  
    console.log(`Images: ${imgs.length} | Missing alt text: ${missingAlt.length}`);
    console.log(`Headings found: ${headings.length} | H1 count: ${h1Count}`);
    console.log("");
  
    if (missingAlt.length) {
      console.group("🚫 Images Missing alt:");
      missingAlt.forEach(i => console.log(i.src));
      console.groupEnd();
    }
  
    console.log("\n✅ Recommendations:");
    console.log("1. Add descriptive alt text for all images.");
    console.log("2. Ensure heading structure follows a logical hierarchy (H1 → H2 → H3).");
    console.log("3. Use semantic HTML tags (nav, main, footer, article).");
    console.log("4. Add ARIA roles and labels for interactive components.");
})();
  