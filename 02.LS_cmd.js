import { spawn } from "node:child_process";
import path from "node:path";

console.log(`Current file: ${import.meta.url}`);
console.log(`Current directory: ${process.cwd()}`);

const outputDir = path.resolve(process.cwd(), "./files", "output");
console.log(`output directory: ${outputDir}`);

const inputDir = path.resolve(process.cwd(), "./files", "input");
console.log(`input directory: ${inputDir}`);

const lsProc = spawn("ls", ["-la", inputDir]);

lsProc.stdout.on("data", (data) => {
  let res = "";
  for (const chunk of data.toString()) {
    res += chunk;
  }
  console.log(res);
});


