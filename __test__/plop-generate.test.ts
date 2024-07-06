import { describe, it, expect } from 'vitest';
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

describe('Plop Generator', () => {
  it('should generate a new post and image folder', async () => {
    const id = ~(Math.random() * 100000000000);
    const title = `Plop Test ${id}`;
    const date = '2024-07-06';
    await runPlop(title, date);

    // Verify that the MDX file was created
    const postPath = path.join(process.cwd(), `src/posts/plop-test-${id}.mdx`);
    const postExists = fs.existsSync(postPath);
    expect(postExists).toBe(true);

    // Verify that the image folder was created
    const imagePath = path.join(process.cwd(), `public/images/plop-test-${id}`);
    const imageFolderExists = fs.existsSync(imagePath);
    expect(imageFolderExists).toBe(true);

    // Clean up generated files
    if (postExists) fs.unlinkSync(postPath);
    if (imageFolderExists) fs.rmdirSync(imagePath, { recursive: true });
  });
});
