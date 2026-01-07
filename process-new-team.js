
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = '/Users/anubhaviitd/Downloads/becon Website/new';
const destDir = '/Users/anubhaviitd/Downloads/becon Website/frontend/public/Team';

const files = [
    { src: 'tanmay.png', dest: 'tanmay.avif' },
    { src: 'vipnish.png', dest: 'vipinsh.avif' }, // Typo fix
    { src: 'siddesh.png', dest: 'siddhesh.avif' }, // Typo fix
    { src: 'chinmay.png', dest: 'chinmay.avif' }
];

async function convert() {
    for (const file of files) {
        const inputPath = path.join(sourceDir, file.src);
        const outputPath = path.join(destDir, file.dest);

        try {
            if (fs.existsSync(inputPath)) {
                await sharp(inputPath)
                    .avif({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Converted ${file.src} to ${file.dest}`);
            } else {
                console.warn(`Source file not found: ${inputPath}`);
            }
        } catch (err) {
            console.error(`Error converting ${file.src}:`, err);
        }
    }
}

convert();
