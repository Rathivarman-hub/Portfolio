import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');

async function processImages() {
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i) && file !== 'logo.png') {
      const filePath = path.join(assetsDir, file);
      const stat = fs.statSync(filePath);
      if (stat.size > 150000) { // > 150KB
        try {
          const parsed = path.parse(filePath);
          const webpPath = path.join(assetsDir, `${parsed.name}.webp`);
          await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
          console.log(`Converted ${file} to ${path.basename(webpPath)}`);
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error(`Failed ${file}:`, e);
        }
      }
    }
  }
}

processImages();
