const fs = require("fs");
const path = require("path");
const { converters } = require("./converters-data.js"); // script.js must end with: module.exports = { converters };

const outputDir = path.join(__dirname, "convert");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

function slugify(str) {
  return str.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "")
            .replace(/--+/g, "-");
}

function createHTML({ name, description, from, to, convert }) {
  const title = `${name} | Everything Converter 169`;
  const meta = description || `Convert ${from} to ${to} instantly with this free tool.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${meta}">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <h1>${name}</h1>
  <p>${meta}</p>
  <input type="number" id="input" placeholder="Enter ${from}">
  <button onclick="convert()">Convert</button>
  <p id="result"></p>

  <script>
    function convert() {
      const val = parseFloat(document.getElementById("input").value);
      if (isNaN(val)) return;
      const result = (${convert.toString()})(val);
      document.getElementById("result").textContent = val + " ${from} = " + result.toFixed(6) + " ${to}";
    }
  </script>
</body>
</html>`;
}

// Loop through all categories and generate HTML files
for (const [category, list] of Object.entries(converters)) {
  for (const converter of list) {
    const slug = slugify(`${converter.from}-to-${converter.to}`);
    const html = createHTML(converter);
    const filePath = path.join(outputDir, `${slug}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`✅ Created: ${slug}.html`);
  }
}
