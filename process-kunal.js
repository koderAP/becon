
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const teamDir = '/Users/anubhaviitd/Downloads/becon Website/frontend/public/Team';

async function convert() {
    const inputPath = path.join(teamDir, 'kunal.png');
    const outputPath = path.join(teamDir, 'kunal.avif');

    try {
        if (fs.existsSync(inputPath)) {
            await sharp(inputPath)
                .avif({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted kunal.png to kunal.avif`);
            // Optional: remove source png to keep clean, or keep it. I'll keep it for safety.
        } else {
            console.warn(`Source file not found: ${inputPath}`);
        }
    } catch (err) {
        console.error(`Error converting kunal.png:`, err);
    }
}

convert();
