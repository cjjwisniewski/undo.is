import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { prerender as layoutPrerender, trailingSlash } from '../src/routes/+layout.ts';
import { GET as getSitemap, prerender as sitemapPrerender } from '../src/routes/sitemap.xml/+server.ts';
import { RESUME_FILES, syncResume } from '../scripts/sync-resume.js';

const repoRoot = process.cwd();

test('root layout enforces static prerender and trailing slashes for Azure $web', () => {
	assert.equal(layoutPrerender, true);
	assert.equal(trailingSlash, 'always');
});

test('sitemap.xml endpoint prerenders valid XML with expected routes', async () => {
	assert.equal(sitemapPrerender, true);
	const response = await getSitemap();
	assert.equal(response.status, 200);
	assert.equal(response.headers.get('Content-Type'), 'application/xml');

	const xml = await response.text();
	assert.match(xml, /<\?xml version="1\.0" encoding="UTF-8" \?>/);
	assert.match(xml, /<urlset[\s\S]*<\/urlset>/);

	for (const route of ['/', '/projects/', '/resume/', '/status/']) {
		assert.ok(
			xml.includes(`<loc>https://www.undo.is${route}</loc>`),
			`Expected sitemap to include ${route}`
		);
	}
});

test('committed resumeData.json satisfies resume page schema contract', () => {
	const raw = fs.readFileSync(path.join(repoRoot, 'src/lib/resumeData.json'), 'utf8');
	const data = JSON.parse(raw);

	const expectedSections = RESUME_FILES.map((file) => file.replace('.yml', ''));
	for (const section of expectedSections) {
		assert.ok(section in data, `Missing resumeData section: ${section}`);
		assert.equal(typeof data[section], 'object');
		assert.notEqual(data[section], null);
	}

	assert.ok(Array.isArray(data.experience.content) && data.experience.content.length > 0);
	assert.ok(Array.isArray(data.certifications.content) && data.certifications.content.length > 0);
	assert.ok(Array.isArray(data.education.content) && data.education.content.length > 0);
	assert.ok(typeof data.profile === 'object');
});

test('syncResume parses YAML sections into JSON and rejects missing dataDir', async () => {
	const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'undois-sync-'));
	try {
		const dataDir = path.join(tmpRoot, '_data');
		fs.mkdirSync(dataDir, { recursive: true });
		fs.writeFileSync(
			path.join(dataDir, 'profile.yml'),
			'name: Test User\ntitle: Cloud Architect\n',
			'utf8'
		);
		fs.writeFileSync(
			path.join(dataDir, 'skills.yml'),
			'section-title: Skills\ncontent:\n  - Terraform\n  - Azure\n',
			'utf8'
		);

		const outputFile = path.join(tmpRoot, 'out', 'resumeData.json');
		const parsed = await syncResume({ dataDir, outputFile });

		assert.equal(parsed.profile.name, 'Test User');
		assert.deepEqual(parsed.skills.content, ['Terraform', 'Azure']);
		assert.ok(fs.existsSync(outputFile));

		const diskJson = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
		assert.equal(diskJson.profile.title, 'Cloud Architect');

		await assert.rejects(
			() => syncResume({ dataDir: path.join(tmpRoot, 'missing'), outputFile }),
			/does not exist/
		);
	} finally {
		fs.rmSync(tmpRoot, { recursive: true, force: true });
	}
});

test('svelte.config.js configures adapter-static dist output with 404.html fallback', () => {
	const configSource = fs.readFileSync(path.join(repoRoot, 'svelte.config.js'), 'utf8');
	assert.match(configSource, /adapter-static/);
	assert.match(configSource, /pages:\s*['"]dist['"]/);
	assert.match(configSource, /fallback:\s*['"]404\.html['"]/);
});
