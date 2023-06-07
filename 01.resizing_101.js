import { spawn } from "node:child_process";

const size = 300;
const originalFilePath = "./files/input/mulher-consultas.jpg";
const destinationPath = `./files/output/mulher-consultas-${Math.random()}.jpeg`;
const h = 800;
const w = 300;

const ffmpegProcess = spawn("ffmpeg", [
  "-i",
  originalFilePath,
  "-vf",
  `scale=${w}:${h}`, // absolute resizing
  // `scale=${size}:-1`, // :-1 == preserve aspect-ratio
  // `scale=w=320:h=240:force_original_aspect_ratio=decrease`,
  // `scale=w=1000:h=700:force_original_aspect_ratio=increase`,
  destinationPath,
])

ffmpegProcess.stdout.on("data", (data) => {
  console.log(`ffmpeg stdout`, { data, strData: data.toString() });
});

ffmpegProcess.on("close", (code) => {
  const status = code === 0 ? "SUCCESS" : "ERROR";
  console.log(`${status}! child process exited with code ${code}`);
});
