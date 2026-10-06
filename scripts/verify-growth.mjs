const siteUrl = (process.env.SITE_URL || "https://dancerportfolio.vercel.app").replace(/\\/$/, "");

async function read(path) {
  const response = await fetch(siteUrl + path, { redirect: "follow" });
  const text = await response.text();
  return { response, text };
}

function check(condition, message) {
  if (!condition) throw new Error(message);
  console.log("✓", message);
}

const home = await read("/");
check(home.response.ok, "Homepage returns 2xx");
check(
  home.text.includes('rel="canonical"') && home.text.includes(siteUrl),
  "Canonical metadata is present and references the production URL",
);
check(
  /"@type"\\s*:\\s*"ProfilePage"/.test(home.text) &&
    /"@type"\\s*:\\s*"Person"/.test(home.text),
  "ProfilePage and Person structured data are present",
);

const robots = await read("/robots.txt");
check(robots.response.ok, "robots.txt returns 2xx");
check(
  robots.text.includes("Sitemap: " + siteUrl + "/sitemap.xml"),
  "robots.txt advertises the production sitemap",
);
check(
  robots.text.includes("Disallow: /growth-admin/") &&
    robots.text.includes("Disallow: /rose-admin/"),
  "Admin routes are excluded from crawling",
);

const sitemap = await read("/sitemap.xml");
check(sitemap.response.ok, "sitemap.xml returns 2xx");
check(sitemap.text.includes(siteUrl), "Sitemap contains the production URL");

const admin = await read("/growth-admin");
check(admin.response.ok, "Growth dashboard foundation returns 2xx");
check(/noindex/i.test(admin.text), "Growth dashboard emits noindex");

if (process.env.GA_MEASUREMENT_ID) {
  check(
    home.text.includes(process.env.GA_MEASUREMENT_ID),
    "Configured GA4 measurement ID is present in the rendered page",
  );
}

console.log("\\nGROWTH-01 production checks passed for", siteUrl);
