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
                const parsed = yaml.load(rawYaml);
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

const isEntrypoint =
    process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isEntrypoint) {
    syncResume().catch((err) => {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
    });
}
