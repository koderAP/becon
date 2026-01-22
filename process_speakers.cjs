const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const inputFile = 'speakers_list.txt';
const outputDir = 'public/speakers/2026';
const outputJson = path.join('src/data', 'speakers_2026.json');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const fileContent = fs.readFileSync(inputFile, 'utf-8');
const lines = fileContent.split('\n').filter(line => line.trim() !== '');

const speakers = [];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const options = new URL(url);
        const reqOptions = {
            hostname: options.hostname,
            path: options.pathname + options.search,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(reqOptions, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                fs.unlink(filepath, () => reject(new Error(`Status ${response.statusCode}`)));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
};

const processSpeakers = async () => {
    let id = 100; // Start IDs from 100 to avoid conflict with existing
    for (const [index, line] of lines.entries()) {
        const parts = line.split('\t');
        if (parts.length < 2) continue;

        const name = parts[0].trim();
        const designation = parts[1].trim();
        const imageUrl = parts[2] ? parts[2].trim() : '';
        const linkedin = parts[3] ? parts[3].trim() : '';

        // Skip headers or empty lines if any (though we filtered empty)
        if (name === 'Name') continue;

        console.log(`Processing ${index + 1}/${lines.length}: ${name}`);

        let finalImageName = '';

        if (imageUrl) {
            const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const tempImage = `temp_${cleanName}_${Date.now()}`;
            const targetImage = `${cleanName}.avif`;
            const targetPath = path.join(outputDir, targetImage);

            // local image check
            const remainingSpeakersDir = '../remaining_speakers';
            let localImageFound = false;

            if (fs.existsSync(remainingSpeakersDir)) {
                // local image check
                const localDirs = ['../remaining_speakers', '../newspeakers'];
                let localImageFound = false;

                for (const dir of localDirs) {
                    if (localImageFound) break;
                    if (fs.existsSync(dir)) {
                        const files = fs.readdirSync(dir);
                        for (const file of files) {
                            const fileCleanName = file.toLowerCase().replace(/[^a-z0-9]/g, '');
                            // Remove honorifics from cleanName for matching
                            const nameForMatch = cleanName.replace(/^(mr|ms|dr|prof)/, '');

                            if (fileCleanName.includes(nameForMatch)) {
                                const sourcePath = path.join(dir, file);
                                console.log(`Found local image for ${name} in ${dir}: ${file}`);
                                fs.copyFileSync(sourcePath, tempImage);
                                localImageFound = true;
                                break;
                            }
                        }
                    }
                }
            }

            try {
                if (!localImageFound) {
                    await downloadImage(imageUrl, tempImage);
                }
                // Convert to avif
                try {
                    execSync(`ffmpeg -y -i "${tempImage}" -c:v libaom-av1 -crf 30 -b:v 0 -cpu-used 8 "${targetPath}"`, { stdio: 'ignore' });
                    // Fallback to simpler encoder if av1 fails or use libwebp as alternative if needed, but av1 requested
                    // Actually let's try generic libaom-av1 or just -c:v libaom-av1
                    // Ensure ffmpeg command is robust. If it fails, maybe input format issue.
                } catch (e) {
                    // Try converting with default settings or auto encoder
                    try {
                        execSync(`ffmpeg -y -i "${tempImage}" "${targetPath}"`, { stdio: 'ignore' });
                    } catch (e2) {
                        console.error(`Failed to convert image for ${name}:`, e2.message);
                    }
                }

                if (fs.existsSync(targetPath)) {
                    finalImageName = `/speakers/2026/${targetImage}`;
                } else {
                    console.error(`Failed to create AVIF for ${name}`);
                }

                if (fs.existsSync(tempImage)) fs.unlinkSync(tempImage);

            } catch (err) {
                console.error(`Failed to download image for ${name}: ${err.message}`);
                if (fs.existsSync(targetPath)) {
                    console.log(`Using existing image for ${name} despite download failure.`);
                    finalImageName = `/speakers/2026/${targetImage}`;
                }
            }
        }

        speakers.push({
            id: id++,
            name,
            designation,
            img: finalImageName || '/speakers/placeholder.avif', // Fallback
            linkedin
        });
    }

    fs.writeFileSync(outputJson, JSON.stringify(speakers, null, 2));
    console.log('Done! Saved to ' + outputJson);
};

processSpeakers();
