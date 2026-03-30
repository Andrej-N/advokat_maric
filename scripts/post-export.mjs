import { writeFileSync } from "fs";
import { join } from "path";

// Create root index.html that redirects to default locale (sr-Latn)
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0; url=./sr-Latn/" />
  <link rel="canonical" href="./sr-Latn/" />
  <title>Marić Advokatura</title>
</head>
<body>
  <p>Redirecting to <a href="./sr-Latn/">Marić Advokatura</a>...</p>
</body>
</html>`;

writeFileSync(join("out", "index.html"), html);
console.log("✓ Created out/index.html → redirect to sr-Latn/");
