import fs from 'node:fs';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import { isNull } from '@lib/shared';

type ContentTransformer = (originalContent: string) => string;

export const generatePost = (
  filePath: string,
  transformers?: ContentTransformer[]
): Post => {
  const slug = filePath.split('/').at(-1)!.replace('.mdx', '');
  const originalContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const transformedContent = transformers
    ? transformers.reduce(
        (content, transformer) => transformer(content),
        originalContent
      )
    : originalContent;

  const { metadata, content } = parsePost(transformedContent);

  return {
    content,
    metadata,
    slug,
  };
};

export const parsePost = (originContent: string): Omit<Post, 'slug'> => {
  const { data: metadata, content } = matter(originContent) as unknown as {
    content: string;
    data: Partial<PostMetadata>;
  };

  metadata.summary ??= content
    .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지 제거
    .replace(/```[\s\S]*?```/g, '') // 코드 블록 제거
    .replace(/`([^`]*)`/g, '$1') // 인라인 코드 제거하고 내용은 포함
    .replace(/#+\s*/gm, '') // 헤더 제거
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 굵은 텍스트 제거
    .replace(/\*([^*]+)\*/g, '$1') // 기울임 텍스트 제거
    .replace(/>\s.*$/gm, '') // 인용문 제거
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 링크 제거
    .replace(/[-*]\s+/g, '') // 리스트 제거
    .replace(/\n/g, ' ') // 모든 \n을 공백 한 개로 바꿈
    .replace(/\s\s+/g, ' ') // 연속된 공백을 최대 1개로 제한
    .trim()
    .slice(0, 100);
  if ([metadata.date, metadata.title, metadata.thumbnail].some(isNull)) {
    console.log(metadata);
    throw new Error(`Missing required metadata`);
  }

  const dateInstance = dayjs(metadata.date, 'YYYY-MM-DD');

  if (!dateInstance.isValid()) throw new Error('Invalid date format');

  metadata.date = dateInstance.format('MMMM D, YYYY');
  metadata.timestamp = dateInstance.valueOf();

  return {
    metadata: metadata as PostMetadata,
    content,
  };
};
