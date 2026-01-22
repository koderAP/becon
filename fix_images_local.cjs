const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = '../newspeakers';
const outputDir = 'public/speakers/2026';
const outputJson = 'src/data/speakers_2026.json';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Map speaker names to expected filenames in newspeakers dir
const speakerFileMap = {
    "Mr. Ramprakash Ramamoorthy": "ramaprakash.jpg",
    "Mr. Namit Malhotra": "namitmalhotra.jpeg",
    "Mr. Chandan Mendiratta": "chandanmendiratta.jpeg",
    "Mr. Jithendra Vepa": "jithendravepa.jpg",
    "Mr. Kaushik Dutta": "kaushikdutta.png.avif",
    "Ms. Radhika Ghai": "radhikaghai.webp",
    "Sanjeev Bhikhchandani": "sanjeevbikhchandnani.webp",
    "Mr. Hitesh Oberoi": "hiteshoberoi.jpg.avif",
    "Sharath Keshava Narayana": "sharath.jpg",
    "Sanjay Sharma": "sanjaysharma.jpeg",
    "Niraj Singh": "nirajsingh.jpg",
    "Dr. R. Shivaraman": "shivaraman.jpeg",
    "Prince Kohli": "princekohli.jpeg",
    "Shailaz Nag": "shailaz.jpeg",
    "Sameer Mahandru": "sammahandru.jpeg",
    "Vivek Mishra": "vivekmishra.jpeg",
    "Sarita Ahlawat": "saritaahlawat.jpeg",
    // "Raj and DK": "", // Not found in list
    "Niranjan Hiranandani": "niranjanhiranandani.jpeg",
    "Amit Khatri": "amitkhatri.jpg",
    "Ranbir Singh": "ranbirsingh.jpeg",
    "Durga Prasad Mishra": "", // Not explicit match found
    "Pratham Mittal": "pratham.JPG.avif",
    "Shaily Mehrotra": "shailymehrotra.jpg.jxl"
};

const speakers = JSON.parse(fs.readFileSync(outputJson, 'utf-8'));

const processImages = async () => {
    for (const speaker of speakers) {
        let sourceFile = speakerFileMap[speaker.name];

        // Auto-match if not mapped explicitly but file exists with similar name
        if (!sourceFile) {
            const cleanName = speaker.name.toLowerCase().replace(/[^a-z]/g, '');
            const files = fs.readdirSync(sourceDir);
            const match = files.find(f => f.toLowerCase().replace(/[^a-z]/g, '').includes(cleanName));
            if (match) sourceFile = match;
        }

        if (sourceFile) {
            const sourcePath = path.join(sourceDir, sourceFile);
            if (fs.existsSync(sourcePath)) {
                console.log(`Processing ${speaker.name} from ${sourceFile}...`);
                const cleanName = speaker.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                const targetImage = `${cleanName}.avif`;
                const targetPath = path.join(outputDir, targetImage);

                try {
                    // Force overwrite with new conversion
                    execSync(`ffmpeg -y -i "${sourcePath}" -c:v liblibaom-av1 -crf 30 -b:v 0 -cpu-used 8 "${targetPath}"`, { stdio: 'ignore' });
                    // Fallback attempt if AV1 fails (e.g. for JXL or weird formats)
                } catch (e) {
                    try {
                        execSync(`ffmpeg -y -i "${sourcePath}" "${targetPath}"`, { stdio: 'ignore' });
                    } catch (e2) {
                        console.error(`Failed to convert image for ${speaker.name}:`, e2.message);
                        continue;
                    }
                }

                if (fs.existsSync(targetPath)) {
                    speaker.img = `/speakers/2026/${targetImage}`;
                }
            } else {
                console.warn(`Source file not found: ${sourcePath}`);
            }
        }
    }

    fs.writeFileSync(outputJson, JSON.stringify(speakers, null, 2));
    console.log('Updated ' + outputJson);
};

processImages();
