(() => {
    console.log("🍪 Cookie & Storage Hygiene Check\n");
  
    // Cookies
    const cookies = document.cookie.split(";").map(c => c.trim());
    console.table(cookies.map(c => ({ Cookie: c.split("=")[0], Secure: c.includes("Secure"), HttpOnly: c.includes("HttpOnly") })));
  
    // Storage
    const localKeys = Object.keys(localStorage);
    const sessionKeys = Object.keys(sessionStorage);
  
    console.log(`LocalStorage entries: ${localKeys.length}`);
    console.log(`SessionStorage entries: ${sessionKeys.length}`);
    console.log(`Approx. localStorage size: ${(new Blob(Object.values(localStorage)).size / 1024).toFixed(1)} KB`);
  
    console.log("\n⚠️ Recommendations:");
    console.log("1. Use 'Secure' and 'HttpOnly' flags for cookies.");
    console.log("2. Avoid storing sensitive tokens in localStorage.");
    console.log("3. Regularly clear expired or unnecessary client-side data.");
})();
  