import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const teamDir = join(__dirname, 'public', 'Team');

async function convertToAvif() {
    const files = readdirSync(teamDir);
    const pngFiles = files.filter(f => extname(f).toLowerCase() === '.png');

    console.log(`Found ${pngFiles.length} PNG files to convert...`);

    for (const file of pngFiles) {
        const inputPath = join(teamDir, file);
        const outputName = basename(file, '.png') + '.avif';
        const outputPath = join(teamDir, outputName);

        try {
            await sharp(inputPath)
                .avif({ quality: 80 })
                .toFile(outputPath);
            console.log(`✓ Converted: ${file} → ${outputName}`);
        } catch (err) {
            console.error(`✗ Failed: ${file}`, err.message);
        }
    }

    console.log('Done!');
}

convertToAvif();
