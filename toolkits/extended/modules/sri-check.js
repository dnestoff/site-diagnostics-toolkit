/**
 * 🔒 Subresource Integrity (SRI) Check
 * ------------------------------------
 * Ensures all external JS and CSS resources use integrity and crossorigin attributes.
 * Helps detect potential supply chain risks due to tampering or unverified external code.
 *
 * Author: Site Diagnostics Toolkit
 */

 (function sriCheck() {
    console.groupCollapsed("🔒 Subresource Integrity (SRI) Check");
  
    const scripts = Array.from(document.querySelectorAll("script[src]"));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"][href]'));
  
    const externalResources = [...scripts, ...styles].filter(el => {
      const src = el.src || el.href;
      if (!src) return false;
      const isExternal = !src.startsWith(location.origin) && !src.startsWith("/") && !src.startsWith("./");
      return isExternal;
    });
  
    const results = externalResources.map(el => {
      const tagName = el.tagName.toLowerCase();
      const src = el.src || el.href;
      const hasIntegrity = !!el.getAttribute("integrity");
      const hasCrossorigin = !!el.getAttribute("crossorigin");
  
      return {
        type: tagName === "script" ? "JavaScript" : "CSS",
        url: src,
        hasIntegrity,
        hasCrossorigin
      };
    });
  
    const missingIntegrity = results.filter(r => !r.hasIntegrity);
    const missingCrossorigin = results.filter(r => !r.hasCrossorigin);
    const totalExternal = results.length;
  
    // Summary Output
    console.log(`🌐 Total External Resources: ${totalExternal}`);
    console.log(`❌ Missing integrity: ${missingIntegrity.length}`);
    console.log(`⚠️ Missing crossorigin: ${missingCrossorigin.length}`);
    console.log("");
  
    // Detailed Breakdown
    if (missingIntegrity.length > 0) {
      console.groupCollapsed("❌ Missing Integrity Attribute");
      missingIntegrity.forEach(r => {
        console.log(`${r.type}: ${r.url}`);
      });
      console.groupEnd();
    }
  
    if (missingCrossorigin.length > 0) {
      console.groupCollapsed("⚠️ Missing Crossorigin Attribute");
      missingCrossorigin.forEach(r => {
        console.log(`${r.type}: ${r.url}`);
      });
      console.groupEnd();
    }
  
    // ✅ Recommendations
    console.groupCollapsed("✅ Recommendations");
    console.log("1. Add 'integrity' attributes for all external JS and CSS files to prevent tampering.");
    console.log("2. Include 'crossorigin=\"anonymous\"' when using SRI to ensure proper CORS validation.");
    console.log("3. Use tools like https://www.srihash.org or 'npm srihash' to generate valid SRI hashes.");
    console.log("4. Host critical resources locally or pin to exact versioned URLs to minimize exposure.");
    console.log("5. Avoid using inline <script> tags for third-party content when possible.");
    console.groupEnd();
  
    // Summary verdict
    if (missingIntegrity.length === 0 && missingCrossorigin.length === 0) {
      console.log("✅ All external scripts and styles include integrity and crossorigin attributes.");
    } else {
      console.warn("⚠️ Some external resources are missing integrity or crossorigin attributes. Review recommended fixes above.");
    }
  
    console.groupEnd();
})();
  