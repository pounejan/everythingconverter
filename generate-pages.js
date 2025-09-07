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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${meta}">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header>
      <nav class="main-nav">
          <div class="nav-container">
              <h1><a href="../index.html">Everything Converter 169</a></h1>
              <ul>
                  <li><a href="../index.html">Home</a></li>
                  <li><a href="../about.html">About</a></li>
                  <li><a href="../privacy-policy.html">Privacy Policy</a></li>
                  <li><a href="../terms-of-service.html">Terms of Service</a></li>
                  <li><a href="../cookie-policy.html">Cookie Policy</a></li>
                  <li><a href="../accessibility-statement.html">Accessibility</a></li>
              </ul>
          </div>
      </nav>
  </header>

  <main>
      <section class="converter-section" style="display:block;">
          <div class="container">
              <article class="converter-tool">
                  <header>
                      <h2>${name}</h2>
                      <p>${meta}</p>
                  </header>
                  <div class="converter-form">
                      <input type="number" id="inputValue" placeholder="Enter ${from}" aria-label="Enter ${from}">
                      <button onclick="convert()" class="convert-btn">Convert</button>
                      <div id="result" class="result"></div>
                  </div>
                  <button class="back-button" onclick="window.location.href='../index.html'">← Back to Categories</button>
              </article>
          </div>
      </section>
  </main>

  <footer>
      <div class="container">
          <p>&copy; 2025 Everything Converter 169. All rights reserved.</p>
          <nav class="footer-nav">
              <a href="../privacy-policy.html">Privacy Policy</a>
              <a href="../terms-of-service.html">Terms of Service</a>
              <a href="../cookie-policy.html">Cookie Policy</a>
              <a href="../accessibility-statement.html">Accessibility</a>
          </nav>
      </div>
  </footer>

  <script>
    function convert() {
      const val = parseFloat(document.getElementById("inputValue").value);
      if (isNaN(val)) return;
      const result = (${convert.toString()})(val);
      document.getElementById("result").style.display = "block";
      document.getElementById("result").textContent = val + " ${from} = " + result.toFixed(6) + " ${to}";
    }
  </script>
</body>
</html>`;
}

