import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXOption } from '../mdx-option';
export default async function LoadRemoteUrl({ url }: { url: string }) {
  const source = await fetch(url).then((res) => res.text());

  const { content } = await compileMDX<{ title: string }>({
    source,
    options: MDXOption,
  });
  return content;
}
