import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Source: one level up in sponsors_2026
const sourceDir = join(__dirname, '../sponsors_2026');
// Dest: public/assets/logos
const destDir = join(__dirname, 'public/assets/logos');

async function processLogos() {
    try {
        const files = readdirSync(sourceDir);
        const pngFiles = files.filter(f => extname(f).toLowerCase() === '.png');

        console.log(`Found ${pngFiles.length} PNG files in ${sourceDir}`);
        console.log(`Converting to ${destDir}...`);

        for (const file of pngFiles) {
            const inputPath = join(sourceDir, file);

            // Clean filename: lowercase, replace spaces/special chars
            let cleanName = basename(file, '.png')
                .toLowerCase()
                .replace(/[']/g, '')     // Remove '
                .replace(/[&]/g, 'and')  // Replace & with and
                .replace(/\s+/g, '-')    // Space to hyphen
                .replace(/_+/g, '-')     // Underscore to hyphen
                .replace(/\./g, '-');    // Dot to hyphen (e.g. 1.5 -> 1-5, startup news.fyi -> startup-news-fyi)

            // Fix specific cases if needed, e.g. double hyphens
            cleanName = cleanName.replace(/-+/g, '-');

            const outputName = cleanName + '.avif';
            const outputPath = join(destDir, outputName);

            try {
                await sharp(inputPath)
                    .avif({ quality: 80 })
                    .toFile(outputPath);
                console.log(`✓ ${file} -> ${outputName}`);
            } catch (err) {
                console.error(`✗ Failed: ${file}`, err.message);
            }
        }
    } catch (err) {
        console.error("Error reading source directory:", err);
    }
}

processLogos();
