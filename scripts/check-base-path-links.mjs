import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const configuredBase = process.env.BASE_PATH || "/";
const basePath = configuredBase === "/" ? "/" : `/${configuredBase.replace(/^\/+|\/+$/g, "")}`;

async function collectHtmlFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const absolutePath = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await collectHtmlFiles(absolutePath)));
		else if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolutePath);
	}
	return files;
}

if (basePath === "/") {
	console.log("Base path is '/', no project-subpath links to validate.");
	process.exit(0);
}

const invalidLinks = [];
const htmlFiles = await collectHtmlFiles(distDir);
const attributePattern = /\b(href|src|action)=(['"])(\/[^'"\s>]*)\2/g;

for (const file of htmlFiles) {
	const html = await readFile(file, "utf8");
	for (const match of html.matchAll(attributePattern)) {
		const [, attribute, , value] = match;
		if (value.startsWith("//") || value === basePath || value.startsWith(`${basePath}/`)) continue;
		invalidLinks.push({
			file: path.relative(distDir, file),
			attribute,
			value,
		});
	}
}

if (invalidLinks.length > 0) {
	console.error(`Found ${invalidLinks.length} root-relative link(s) outside BASE_PATH ${basePath}:`);
	for (const link of invalidLinks) {
		console.error(`- ${link.file}: ${link.attribute}=${JSON.stringify(link.value)}`);
	}
	process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files: all root-relative links use ${basePath}.`);
