import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, 'public', 'Indian_Institute_of_Technology_Delhi_Logo.svg');
const outputPath = path.join(__dirname, 'public', 'iitd_logo.avif');

console.log(`Converting ${inputPath} to ${outputPath}...`);

sharp(inputPath)
    .resize(256) // Sufficient resolution for a button icon
    .avif({ quality: 90 })
    .toFile(outputPath)
    .then(info => console.log('Success:', info))
    .catch(err => console.error('Error:', err));
