import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const svgBuffer = readFileSync(join(import.meta.dir, "../public/favicon.svg"));

// Generate favicon.ico with multiple sizes
const sizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  sizes.map((s) => sharp(svgBuffer).resize(s, s).png().toBuffer())
);

// ICO format: header + directory entries + image data
const numImages = icoBuffers.length;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(numImages, 4); // number of images

let offset = 6 + numImages * 16; // header + entries
const entries = [];

for (let i = 0; i < numImages; i++) {
  const size = sizes[i];
  const buf = icoBuffers[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(buf.length, 8); // image size
  entry.writeUInt32LE(offset, 12); // image offset
  entries.push({ entry, data: buf });
  offset += buf.length;
}

const ico = Buffer.concat([header, ...entries.map((e) => e.entry), ...entries.map((e) => e.data)]);
const { writeFileSync } = await import("fs");
writeFileSync(join(import.meta.dir, "../public/favicon.ico"), ico);
console.log("Created favicon.ico");

// Generate OG image (1200x630)
const ogWidth = 1200;
const ogHeight = 630;
const logoSize = 120;

const logoSvg = `<svg width="${logoSize}" height="${Math.round(logoSize * 46 / 61)}" viewBox="0 0 61 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31 15H46V31H31V46H0V0H31V15ZM61 46H46V31H61V46ZM61 15H46V0H61V15Z" fill="#EC3013"/>
</svg>`;

const ogSvg = `<svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${ogWidth}" height="${ogHeight}" fill="white"/>
  <g transform="translate(${(ogWidth - logoSize) / 2}, ${(ogHeight - 90) / 2})">
    ${logoSvg}
  </g>
  <text x="${ogWidth / 2}" y="${(ogHeight - 90) / 2 + 90 + 50}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="#201e1d">TrainerTwin</text>
  <text x="${ogWidth / 2}" y="${(ogHeight - 90) / 2 + 90 + 100}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" fill="#666">AI Interview Coaching at Scale</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(import.meta.dir, "../public/og-image.png"));
console.log("Created og-image.png");
