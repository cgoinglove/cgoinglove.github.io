import { sync } from 'glob';
import { generatePost } from './generator';

const imagePathReplacer = (content: string) =>
  content.replaceAll('../../public/images', '/images');

export const scan = (pattern: string): Post[] =>
  sync(pattern).map((path) => generatePost(path, [imagePathReplacer]));
