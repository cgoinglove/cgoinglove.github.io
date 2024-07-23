import { describe, it, expect, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const runPlop = (title: string, date: string) => {
  return new Promise((resolve, reject) => {
    exec(`npm run generate "${title}" "${date}"`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

const id = ~(Math.random() * 100000000000);
const postPath = path.join(process.cwd(), `src/posts/plop-test-${id}.mdx`);
const imagePath = path.join(process.cwd(), `public/images/plop-test-${id}`);

describe('Plop Generator', () => {
  it('should generate a new post and image folder', async () => {
    const title = `Plop Test ${id}`;
    const date = '2024-07-06';
    await runPlop(title, date);

    // Verify that the MDX file was created

    const postExists = fs.existsSync(postPath);
    expect(postExists).toBe(true);

    // Verify that the image folder was created

    const imageFolderExists = fs.existsSync(imagePath);
    expect(imageFolderExists).toBe(true);
  });
});
// Clean up generated files
afterAll(() => {
  fs.existsSync(postPath) && fs.unlinkSync(postPath);
  fs.existsSync(imagePath) && fs.rmdirSync(imagePath, { recursive: true });
});
