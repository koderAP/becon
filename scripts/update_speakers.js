
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = '/Users/anubhaviitd/Downloads/becon Website/speakers';
const targetDir = path.join(__dirname, '../public/speakers');

const mapping = {
    'Amit.png': 'AmitJain.avif',
    'Nikhil.png': 'NikhilKamath.avif',
    'Prashanth.png': 'PrashanthPrakash.avif',
    'Radhika.png': 'RadhikaGupta.avif',
    'Ritesh.png': 'RiteshAgarwal.avif',
    'Ruchira.png': 'RuchiraShukla.avif',
    'Tanmay.png': 'TanmayBhat.avif',
    'Terry.png': 'TerryWu.avif'
};

const processImages = async () => {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const [sourceFile, targetFile] of Object.entries(mapping)) {
        const sourcePath = path.join(sourceDir, sourceFile);
        const targetPath = path.join(targetDir, targetFile);

        if (fs.existsSync(sourcePath)) {
            try {
                await sharp(sourcePath)
                    .toFormat('avif', { quality: 80 })
                    .toFile(targetPath);
                console.log(`✅ Converted ${sourceFile} -> ${targetFile}`);
            } catch (err) {
                console.error(`❌ Error converting ${sourceFile}:`, err);
            }
        } else {
            console.warn(`⚠️ Source file not found: ${sourceFile}`);
        }
    }
};

processImages();
