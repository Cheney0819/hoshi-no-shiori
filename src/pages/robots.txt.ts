import type { APIRoute } from "astro";
import { url } from "@/utils/url-utils";

const siteUrl = import.meta.env.SITE || "http://localhost";
const robotsTxt = `
User-agent: *
Disallow: ${url("/_astro/")}

Sitemap: ${new URL(url("/sitemap-index.xml"), siteUrl).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
