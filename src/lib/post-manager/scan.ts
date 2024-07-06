import { sync } from 'glob';
import { generatePost } from './generator';

export const scan = (pattern: string): Post[] =>
  sync(pattern).map(generatePost);
