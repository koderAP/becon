
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/reel_deal.png');
const outputPath = path.join(__dirname, '../public/reel_deal.avif');

async function convert() {
    try {
        if (!fs.existsSync(inputPath)) {
            console.error('Input file not found:', inputPath);
            process.exit(1);
        }

        await sharp(inputPath)
            .avif({ quality: 80 })
            .toFile(outputPath);

        console.log('Conversion complete:', outputPath);
    } catch (err) {
        console.error('Error converting file:', err);
        process.exit(1);
    }
}

convert();
