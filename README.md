# Blog

A sleek static blog built with [Next.js](https://nextjs.org/) and hosted on GitHub Pages. Simplified post creation using Plop and automated deployment with GitHub Actions. Utilizes [next-remote-mdx](https://nextjs.org/docs/app/building-your-application/configuring/mdx#remote-mdx) and [glob](!https://github.com/isaacs/node-glob#readme) for static site generation.

## Generating New Posts

Create new posts effortlessly with [Plop.js](https://plopjs.com/)

```bash
pnpm generate

# You can also provide the title and date directly:
pnpm generate 'Your Title' '2022-03-03'
```

Follow the prompts for the post title and date. This will generate a new MDX file in src/posts and a corresponding image folder in public/images.

### Plop Template 'post.hbs'

```mdx
---
title: '{{title}}'
date: '{{date}}'
thumbnail: '/images/{{slugify title}}/'
---

Write your post content here.
```

## Deployment

Automatically deploy new posts with GitHub Actions. Just commit and push your changes:

```bash
git add .
git commit -m "Add new post"
git push origin main
```

## Testing

We use [Vitest](https://vitest.dev/) to test the Plop generator and post parser

### Plop Generator Test

Tests the Plop generator to ensure that new posts and image folders are created correctly.

```typescript
it('should generate a new post and image folder', () => {
  // ...
  await runPlop(title, date);
  expect(postExists).toBe(true);
  expect(imageFolderExists).toBe(true);
});
```

### Post Parser Test

Tests the parsing and generation of posts to ensure that metadata and content are handled correctly.

```typescript
beforeAll(() => {
  const testContent = `
        ---
        title: "Test Post"
        date: "2024-07-04"
        thumbnail: "image.jpg"
        ---

        # Heading

        This is a test post.`;
  fs.writeFileSync(testFilePath, testContent);
});

it('should generate a post with valid metadata and content', () => {
  const post = generatePost(testFilePath);

  expect(post.metadata.title).toBe('Test Post');
  expect(post.metadata.date).toBe('July 4, 2024');
  expect(post.metadata.thumbnail).toBe('image.jpg');
  expect(post.metadata.summary).toBe('Heading This is a test post.');
  expect(post.content).toContain('# Heading');
  expect(post.slug).toBe('temp');
});
```
