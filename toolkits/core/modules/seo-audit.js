(async () => {
    console.log("📊 Running Advanced SEO & Link Health Audit...\n");
  
    const report = {
      title: document.title || "❌ Missing",
      metaDescription: document.querySelector("meta[name='description']")?.content || "❌ Missing",
      canonical: document.querySelector("link[rel='canonical']")?.href || "❌ Missing",
      ogTitle: document.querySelector("meta[property='og:title']")?.content || "❌ Missing",
      ogDescription: document.querySelector("meta[property='og:description']")?.content || "❌ Missing",
      twitterCard: document.querySelector("meta[name='twitter:card']")?.content || "❌ Missing",
      links: [...document.querySelectorAll("a[href]")].map(a => ({
        href: a.href,
        text: a.textContent.trim().slice(0, 50),
        rel: a.rel,
        nofollow: a.rel.includes("nofollow"),
        external: !a.href.includes(location.hostname)
      })),
      images: [...document.querySelectorAll("img")].map(img => ({
        src: img.src,
        alt: img.alt
      }))
    };
  
    // Evaluate link statistics
    const totalLinks = report.links.length;
    const externalLinks = report.links.filter(l => l.external).length;
    const nofollowLinks = report.links.filter(l => l.nofollow).length;
  
    // Check for missing alt attributes
    const imagesMissingAlt = report.images.filter(i => !i.alt || i.alt.trim() === "").length;
  
    // Test robots.txt and sitemap.xml accessibility
    async function checkUrlStatus(url) {
      try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok ? "✅ Accessible" : `❌ ${res.status}`;
      } catch {
        return "❌ Not reachable";
      }
    }
  
    const robotsTxt = await checkUrlStatus(`${location.origin}/robots.txt`);
    const sitemapXml = await checkUrlStatus(`${location.origin}/sitemap.xml`);
  
    // Title & description evaluation
    const titleLength = report.title.length;
    const descriptionLength = report.metaDescription.length;
  
    const recommendations = [];
  
    if (titleLength < 30 || titleLength > 65)
      recommendations.push(`Optimize title length (currently ${titleLength} chars). Ideal: 50–60.`);
    if (descriptionLength < 70 || descriptionLength > 160)
      recommendations.push(`Meta description should be 120–155 chars. Current: ${descriptionLength}.`);
    if (report.canonical === "❌ Missing")
      recommendations.push("Add a canonical URL to prevent duplicate content issues.");
    if (report.ogTitle === "❌ Missing" || report.ogDescription === "❌ Missing")
      recommendations.push("Add Open Graph tags for richer social sharing.");
    if (report.twitterCard === "❌ Missing")
      recommendations.push("Add Twitter Card tags for social previews.");
    if (externalLinks > 50 && nofollowLinks === 0)
      recommendations.push("Consider using 'nofollow' for untrusted or affiliate external links.");
    if (imagesMissingAlt > 0)
      recommendations.push(`Add alt text for ${imagesMissingAlt} image(s) to improve accessibility and SEO.`);
    if (robotsTxt.includes("❌"))
      recommendations.push("robots.txt is missing or inaccessible; add one to guide crawlers.");
    if (sitemapXml.includes("❌"))
      recommendations.push("sitemap.xml is missing or inaccessible; add one for better indexing.");
  
    console.group("📈 SEO Metadata & Link Health Audit");
    console.log(`Title: ${report.title}`);
    console.log(`Meta Description: ${report.metaDescription}`);
    console.log(`Canonical URL: ${report.canonical}`);
    console.log(`Open Graph Title: ${report.ogTitle}`);
    console.log(`Open Graph Description: ${report.ogDescription}`);
    console.log(`Twitter Card: ${report.twitterCard}\n`);
  
    console.log(`Total Links: ${totalLinks}`);
    console.log(`External Links: ${externalLinks}`);
    console.log(`No-follow Links: ${nofollowLinks}`);
    console.log(`Images Missing Alt: ${imagesMissingAlt}`);
    console.log(`robots.txt: ${robotsTxt}`);
    console.log(`sitemap.xml: ${sitemapXml}`);
    console.groupEnd();
  
    console.group("\n✅ Recommendations");
    if (recommendations.length === 0) console.log("Looks great! No major SEO issues detected 🎉");
    else recommendations.forEach((r, i) => console.log(`${i + 1}. ${r}`));
    console.groupEnd();
})();