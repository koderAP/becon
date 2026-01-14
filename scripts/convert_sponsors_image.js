
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = '/Users/anubhaviitd/Downloads/becon Website/past_sponsors.png';
const outputDir = '/Users/anubhaviitd/Downloads/becon Website/frontend/public/sponsors';
const outputPath = path.join(outputDir, 'past_sponsors.avif');

async function convertImage() {
    try {
        if (!fs.existsSync(inputPath)) {
            console.error(`Input file not found: ${inputPath}`);
            process.exit(1);
        }

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        await sharp(inputPath)
            .avif({ quality: 80 })
            .toFile(outputPath);

        console.log(`Successfully converted ${inputPath} to ${outputPath}`);
    } catch (error) {
        console.error('Error converting image:', error);
        process.exit(1);
    }
}

convertImage();
