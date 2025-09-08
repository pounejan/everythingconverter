const fs = require("fs");

const baseUrl = "https://everythingconverter169.com";

const pages = [
  "/", 
  "/about.html",
  "/privacy-policy.html",
  "/terms-of-service.html",
  "/cookie-policy.html",
  "/accessibility-statement.html",
  "/convert/meters-to-feet.html",
  // 👉 Add more converter pages here as you create them
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);
console.log("✅ sitemap.xml has been generated!");

