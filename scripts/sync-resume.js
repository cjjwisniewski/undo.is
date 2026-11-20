import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import yaml from 'js-yaml';

const DEFAULT_DATA_DIR = path.join(process.cwd(), 'resume-data/_data');
const DEFAULT_OUTPUT_FILE = path.join(process.cwd(), 'src/lib/resumeData.json');

export const RESUME_FILES = [
    'certifications.yml',
    'education.yml',
    'experience.yml',
    'objective.yml',
    'profile.yml',
    'projects.yml',
    'references.yml',
    'skills.yml',
    'volunteering.yml'
];

const ALLOWED_TAGS = new Set(['br', 'b', 'strong', 'i', 'em', 'u', 'span', 'div', 'a']);
const SAFE_CSS_PROPS = new Set(['font-size', 'font-weight', 'font-style', 'text-decoration']);

function sanitizeStyleAttr(rawStyle) {
    const kept = [];
    for (const decl of String(rawStyle).split(';')) {
        const idx = decl.indexOf(':');
        if (idx === -1) continue;
        const prop = decl.slice(0, idx).trim().toLowerCase();
        const val = decl.slice(idx + 1).trim();
        if (
            SAFE_CSS_PROPS.has(prop) &&
            /^[a-z0-9.%-\s]+$/i.test(val) &&
            !/url\s*\(|expression\s*\(/i.test(val)
        ) {
            kept.push(`${prop}:${val}`);
        }
    }
    return kept.join('; ');
}

function sanitizeHrefAttr(rawHref) {
    const trimmed = String(rawHref).trim();
    if (/^(https?:\/\/|mailto:)/i.test(trimmed)) {
        return trimmed.replace(/"/g, '&quot;');
    }
    return null;
}

/**
 * Sanitizes inline HTML in resume YAML fields before writing resumeData.json,
 * stripping executable tags, event handlers, and unsafe URIs while preserving
 * simple formatting markup used by the resume template.
 */
export function sanitizeResumeHtml(input) {
    if (typeof input !== 'string' || !input.includes('<')) {
        return input;
    }

    // Remove script/style/iframe/object/embed/svg blocks including their contents
    let cleaned = input.replace(
        /<\s*(script|style|iframe|object|embed|svg)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,
        ''
    );

    // Filter remaining tags against strict allowlist
    cleaned = cleaned.replace(/<\s*(\/?)\s*([a-z0-9-]+)([^>]*)>/gi, (match, slash, rawTag, rawAttrs) => {
        const tag = rawTag.toLowerCase();
        if (!ALLOWED_TAGS.has(tag)) {
            return '';
        }
        if (slash) {
            return tag === 'br' ? '' : `</${tag}>`;
        }
        if (tag === 'br') {
            return '<br>';
        }

        const safeAttrs = [];
        const attrRe = /([a-z0-9-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;
        let attrMatch;
        while ((attrMatch = attrRe.exec(rawAttrs)) !== null) {
            const attrName = attrMatch[1].toLowerCase();
            const attrVal = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';
            if (attrName === 'style' && (tag === 'div' || tag === 'span')) {
                const safeStyle = sanitizeStyleAttr(attrVal);
                if (safeStyle) safeAttrs.push(`style="${safeStyle}"`);
            } else if (attrName === 'href' && tag === 'a') {
                const safeHref = sanitizeHrefAttr(attrVal);
                if (safeHref) {
                    safeAttrs.push(`href="${safeHref}"`, 'target="_blank"', 'rel="noopener noreferrer"');
                }
            }
        }

        return safeAttrs.length > 0 ? `<${tag} ${safeAttrs.join(' ')}>` : `<${tag}>`;
    });

    return cleaned;
}

function sanitizeResumeValue(value) {
    if (typeof value === 'string') {
        return sanitizeResumeHtml(value);
    }
    if (Array.isArray(value)) {
        return value.map(sanitizeResumeValue);
    }
    if (value && typeof value === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            out[k] = sanitizeResumeValue(v);
        }
        return out;
    }
    return value;
}

export async function syncResume({
    dataDir = DEFAULT_DATA_DIR,
    outputFile = DEFAULT_OUTPUT_FILE
} = {}) {
    console.log(`Syncing resume data from ${dataDir}...`);
    const resumeData = {};

    if (!fs.existsSync(dataDir)) {
        throw new Error(`Data directory ${dataDir} does not exist.`);
    }

    for (const filename of RESUME_FILES) {
        const filePath = path.join(dataDir, filename);
        if (fs.existsSync(filePath)) {
            try {
                const rawYaml = fs.readFileSync(filePath, 'utf8');
                const parsed = sanitizeResumeValue(yaml.load(rawYaml));
                const sectionName = filename.replace('.yml', '');
                resumeData[sectionName] = parsed;
                console.log(`- Synced ${filename}`);
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                console.error(`Error parsing ${filename}: ${message}`);
            }
        } else {
            console.warn(`Warning: ${filename} not found in ${dataDir}`);
        }
    }

    const dir = path.dirname(outputFile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputFile, JSON.stringify(resumeData, null, 2));
    console.log(`Done! Resume data saved to ${outputFile}`);
    return resumeData;
}

const isEntrypoint = Boolean(
    process.argv[1] && path.basename(process.argv[1]) === 'sync-resume.js'
);

if (isEntrypoint) {
    syncResume().catch((err) => {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
    });
}
