const fs = require("fs");
const { converters } = require("./converters-data.js"); // same as your generator uses

const baseUrl = "https://everythingconverter169.com";

function slugify(str) {
  return str.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "")
            .replace(/--+/g, "-");
}

let urls = [`${baseUrl}/`]; // homepage

// Loop all converters
for (const [category, list] of Object.entries(converters)) {
  for (const converter of list) {
    const slug = slugify(`${converter.from}-to-${converter.to}`);
    urls.push(`${baseUrl}/convert/${slug}.html`);
  }
}

// Build sitemap XML
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(url => 
    `  <url>\n    <loc>${url}</loc>\n  </url>`
  ).join("\n") +
  `\n</urlset>`;

// Save sitemap.xml
fs.writeFileSync("sitemap.xml", sitemap);
console.log("✅ sitemap.xml generated with", urls.length, "pages");
