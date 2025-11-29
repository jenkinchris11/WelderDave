import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const today = new Date().toISOString().slice(0, 10);
const __dirname = fileURLToPath(new URL('..', import.meta.url));
const sitemapPath = resolve(__dirname, 'public/sitemap.xml');

const sitemapContent = readFileSync(sitemapPath, 'utf8');
const lastmodPattern = /<lastmod>[^<]*<\/lastmod>/g;

if (!lastmodPattern.test(sitemapContent)) {
  throw new Error('No <lastmod> tag found to update in sitemap.xml');
}

const updatedContent = sitemapContent.replace(lastmodPattern, `<lastmod>${today}</lastmod>`);

writeFileSync(sitemapPath, updatedContent, 'utf8');
console.log(`Updated <lastmod> in sitemap.xml to ${today}`);
