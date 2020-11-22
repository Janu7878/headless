const sitemap = require("nextjs-sitemap-generator");
const fs = require("fs");

const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();

sitemap({
    baseUrl: 'https://localhost:3000',
    pagesDirectory: __dirname + "/.next/server/pages",
    targetDirectory: "public/",
    ignoredExtensions: ["js", "map"],
    ignoredPaths: ["[fallback]"],
});

console.log(`✅ sitemap.xml generated!`);
