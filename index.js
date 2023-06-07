import { exec } from "node:child_process";
import { promisify } from "node:util";
import fs from 'node:fs';
import path from "node:path";

const execAsync = promisify(exec);

const outputDir = path.resolve(process.cwd(), "./files", "output");
const inputDir = path.resolve(process.cwd(), "./files", "input");

// clear /files/output
fs.readdirSync(outputDir).forEach(file => fs.rmSync(`${outputDir}/${file}`));

// read files from /files/input
const lsInputFiles = await execAsync(`ls ${inputDir}`);
const inputFiles = lsInputFiles.stdout.split("\n").filter(Boolean);

const imgSizes = [10, 36, 120, 240, 360, 1000];
const fileExtension = '.webp';

for await (const filename of inputFiles) {
  const noExtensionFilename = filename.replace(/\.(.)+/, "");

  for await (const size of imgSizes) {
    // run ffmpeg on input file for each imgSize, store it in /files/output
    await execAsync(
      `ffmpeg -i ${inputDir}/${filename} -vf scale=${size}:-1 ${outputDir}/${noExtensionFilename}-${size}${fileExtension}`
    );
  }
}

// prettier-ignore
console.log(`done! ${inputFiles.length} files converted into ${inputFiles.length * imgSizes.length} images`);
