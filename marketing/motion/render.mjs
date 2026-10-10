// Setup (uma vez): cd marketing/motion && mkdir render-tools && cd render-tools && npm init -y && npm i playwright-core ffmpeg-static
// Render:          node marketing/motion/render.mjs marketing/motion/klaxo-reel.html marketing/motion pt es
// Renderiza klaxo-reel.html frame a frame + áudio offline → MP4 (H.264/AAC)
// uso: node render.mjs <html> <outDir> <lang...>
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import os from 'os';

const require = createRequire(new URL('./render-tools/package.json', import.meta.url));
const { chromium } = require('playwright-core');
const ffmpeg = require('ffmpeg-static');

const [html, outDir, ...langs] = process.argv.slice(2);
const FPS = 30;
const exe = path.join(os.homedir(), 'AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe');

const browser = await chromium.launch({ executablePath: exe, args: ['--autoplay-policy=no-user-gesture-required'] });
for (const lang of langs) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const url = 'file:///' + path.resolve(html).replace(/\\/g, '/') + `?render=1&lang=${lang}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => ['DM Sans', 'JetBrains Mono', 'Nunito'].map(f => `${f}:${document.fonts.check(`800 40px "${f}"`) || document.fonts.check(`400 40px "${f}"`)}`).join(' '));
  console.log(lang, 'fonts', fonts);

  // áudio
  const wavB64 = await page.evaluate(() => window.renderAudioWav());
  const wav = path.join(outDir, `.klaxo-reel-${lang}.wav`);
  writeFileSync(wav, Buffer.from(wavB64, 'base64'));

  const duration = await page.evaluate(() => window.DURATION);
  const frames = Math.round(duration * FPS);
  const out = path.join(outDir, `klaxo-reel-${lang}.mp4`);
  const ff = spawn(ffmpeg, [
    '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
    '-i', wav,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
    '-shortest', '-movflags', '+faststart', out,
  ], { stdio: ['pipe', 'ignore', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));

  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.renderFrame(t), i / FPS);
    const png = await page.screenshot({ type: 'png' });
    if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log(lang, `frame ${i}/${frames}`);
  }
  ff.stdin.end();
  await done;
  console.log('OK', out);
  await page.close();
}
await browser.close();
