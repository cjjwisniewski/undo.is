import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// The directory where the resume data is checked out (configured in Github Actions)
const DATA_DIR = path.join(process.cwd(), 'resume-data/_data');
const OUTPUT_FILE = path.join(process.cwd(), 'src/lib/resumeData.json');

const FILES = [
    'certifications.yml',
    'education.yml',
    'experience.yml',
    'objective.yml',
    'profile.yml',
    'references.yml',
    'skills.yml',
    'volunteering.yml'
];

async function sync() {
    console.log(`Syncing resume data from ${DATA_DIR}...`);
    const resumeData = {};

    if (!fs.existsSync(DATA_DIR)) {
        console.error(`Error: Data directory ${DATA_DIR} does not exist.`);
        process.exit(1);
    }

    for (const filename of FILES) {
        const filePath = path.join(DATA_DIR, filename);
        if (fs.existsSync(filePath)) {
            try {
                const rawYaml = fs.readFileSync(filePath, 'utf8');
                const parsed = yaml.load(rawYaml);
                const sectionName = filename.replace('.yml', '');
                resumeData[sectionName] = parsed;
                console.log(`- Synced ${filename}`);
            } catch (err) {
                console.error(`Error parsing ${filename}: ${err.message}`);
            }
        } else {
            console.warn(`Warning: ${filename} not found in ${DATA_DIR}`);
        }
    }

    // Ensure directory exists for output
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(resumeData, null, 2));
    console.log(`Done! Resume data saved to ${OUTPUT_FILE}`);
}

sync();
