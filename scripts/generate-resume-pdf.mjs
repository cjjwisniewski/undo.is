import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright-core';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const OUTPUT_PDF = path.join(DIST_DIR, 'resume.pdf');

const MIME_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.xml': 'application/xml; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8',
	'.woff2': 'font/woff2'
};

function findBrowserExecutable() {
	const candidates = [
		process.env.CHROME_PATH,
		'/usr/bin/google-chrome',
		'/usr/bin/google-chrome-stable',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser',
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
	].filter(Boolean);

	for (const candidate of candidates) {
		if (fs.existsSync(candidate)) {
			return candidate;
		}
	}

	const playwrightExec = chromium.executablePath();
	if (playwrightExec && fs.existsSync(playwrightExec)) {
		return playwrightExec;
	}

	throw new Error(
		'No Chromium/Chrome executable found. Set CHROME_PATH or run `npx playwright-core install chromium`.'
	);
}

function resolveDistFile(urlPath) {
	let decodedPath;
	try {
		decodedPath = decodeURIComponent(urlPath.split('?')[0]);
	} catch {
		return null;
	}

	const relativePath = decodedPath.replace(/^\/+/, '');
	const candidate = path.resolve(DIST_DIR, relativePath);
	if (candidate !== DIST_DIR && !candidate.startsWith(DIST_DIR + path.sep)) {
		return 'forbidden';
	}

	if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
		return candidate;
	}

	const indexCandidate = path.resolve(candidate, 'index.html');
	if (
		(indexCandidate === DIST_DIR || indexCandidate.startsWith(DIST_DIR + path.sep)) &&
		fs.existsSync(indexCandidate) &&
		fs.statSync(indexCandidate).isFile()
	) {
		return indexCandidate;
	}

	return null;
}

function startStaticServer() {
	return new Promise((resolve, reject) => {
		const server = http.createServer((req, res) => {
			const filePath = resolveDistFile(req.url || '/');
			if (filePath === 'forbidden') {
				res.writeHead(403).end('Forbidden');
				return;
			}
			if (!filePath) {
				res.writeHead(404).end('Not Found');
				return;
			}

			const ext = path.extname(filePath).toLowerCase();
			res.writeHead(200, {
				'Content-Type': MIME_TYPES[ext] || 'application/octet-stream'
			});
			fs.createReadStream(filePath).pipe(res);
		});

		server.on('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			if (!address || typeof address === 'string') {
				reject(new Error('Failed to bind local static server'));
				return;
			}
			resolve({ server, port: address.port });
		});
	});
}

async function generatePdf() {
	if (!fs.existsSync(path.join(DIST_DIR, 'resume', 'index.html'))) {
		throw new Error('Built resume page not found at dist/resume/index.html. Run `npm run build` first.');
	}

	const executablePath = findBrowserExecutable();
	const { server, port } = await startStaticServer();
	let browser;

	try {
		browser = await chromium.launch({
			executablePath,
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		const page = await browser.newPage();
		await page.goto(`http://127.0.0.1:${port}/resume/`, {
			waitUntil: 'load',
			timeout: 30000
		});

		await Promise.race([
			page.evaluate(() => document.fonts?.ready),
			new Promise((resolve) => setTimeout(resolve, 3000))
		]);

		await page.emulateMedia({ media: 'print' });
		await page.pdf({
			path: OUTPUT_PDF,
			format: 'A4',
			printBackground: true,
			preferCSSPageSize: true
		});

		const stats = fs.statSync(OUTPUT_PDF);
		console.log(`Generated ${OUTPUT_PDF} (${Math.round(stats.size / 1024)} KB)`);
	} finally {
		await browser?.close();
		await new Promise((resolve) => server.close(resolve));
	}
}

generatePdf().catch((err) => {
	console.error(err);
	process.exit(1);
});
