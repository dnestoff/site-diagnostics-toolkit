(async () => {
    console.log("🛡️ Security & Privacy Headers Audit\n");
  
    const res = await fetch(location.href, { method: "HEAD" });
    const headers = Object.fromEntries(res.headers.entries());
  
    const required = {
      "content-security-policy": "Prevents XSS by restricting sources of scripts & content",
      "strict-transport-security": "Enforces HTTPS connections",
      "x-frame-options": "Prevents clickjacking",
      "x-content-type-options": "Prevents MIME-sniffing attacks",
      "referrer-policy": "Controls how much referrer data is sent",
      "permissions-policy": "Restricts browser APIs like camera, microphone, etc.",
      "cross-origin-resource-policy": "Protects against data leaks from other origins",
      "cross-origin-opener-policy": "Mitigates cross-origin data leaks in shared browsing contexts",
    };
  
    const results = [];
    for (const [header, desc] of Object.entries(required)) {
      if (headers[header]) {
        results.push(`✅ ${header}: ${headers[header]}`);
      } else {
        results.push(`❌ Missing ${header} — ${desc}`);
      }
    }
  
    console.group("Security Headers Report");
    console.table(headers);
    console.groupEnd();
  
    console.group("\n✅ Recommendations");
    results.forEach(r => console.log(r));
    console.groupEnd();
})();
  