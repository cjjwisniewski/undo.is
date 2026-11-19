export const prerender = true;

const ROUTES = [
    { path: '/', priority: '1.0' },
    { path: '/projects/', priority: '0.8' },
    { path: '/resume/', priority: '0.8' },
    { path: '/status/', priority: '0.6' }
];

export async function GET() {
    const lastmod = new Date().toISOString().split('T')[0];
    const urls = ROUTES.map(
        ({ path, priority }) => `    <url>
        <loc>https://www.undo.is${path}</loc>
        <lastmod>${lastmod}</lastmod>
        <priority>${priority}</priority>
    </url>`
    ).join('\n');

    return new Response(
        `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
}
