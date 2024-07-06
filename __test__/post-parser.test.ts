import { parsePost, generatePost } from '@lib/post-manager/generator';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const testFilePath = path.join(__dirname, 'temp.mdx');

beforeAll(() => {
  const testContent = `
---
title: "Test Post"
date: "2024-07-04"
thumbnail: "image.jpg"
---

# Heading

This is a test post.`.trim();
  fs.writeFileSync(testFilePath, testContent);
});
afterAll(() => {
  fs.unlinkSync(testFilePath);
});

describe('parsePost', () => {
  it('should generate a post with valid metadata and content', () => {
    const post = generatePost(testFilePath);

    expect(post.metadata.title).toBe('Test Post');
    expect(post.metadata.date).toBe('July 4, 2024');
    expect(post.metadata.thumbnail).toBe('image.jpg');
    expect(post.metadata.summary).toBe('Heading This is a test post.');
    expect(post.content).toContain('# Heading');
    expect(post.slug).toBe('temp');
  });

  it('should parse post with valid metadata and content', () => {
    const originContent = `
---
title: "Sample Post"
date: "2024-07-04"
thumbnail: "image.jpg"
---

# This is a heading

This is some **bold** text and *italic* text.

![image](https://example.com/image.jpg)

> This is a quote

\`\`\`
console.log("This is a code block");
\`\`\`

This is a [link](https://example.com).`.trim();

    const result = parsePost(originContent);

    expect(result.metadata.title).toBe('Sample Post');
    expect(result.metadata.date).toBe('July 4, 2024');
    expect(result.metadata.thumbnail).toBe('image.jpg');
    expect(result.metadata.summary).toBe(
      'This is a heading This is some bold text and italic text. This is a link.'
    );
    expect(result.content).toContain('# This is a heading');
  });

  it('should throw an error if required metadata is missing', () => {
    const originContent = `
---
title: "Sample Post"
---

Content without date and thumbnail.
    `.trim();

    expect(() => parsePost(originContent)).toThrow();
  });

  it('should throw an error if date format is invalid', () => {
    const originContent = `
---
title: "Sample Post"
date: "invalid-date"
thumbnail: "image.jpg"
---

Content with invalid date format.
    `.trim();

    expect(() => parsePost(originContent)).toThrow();
  });
});
