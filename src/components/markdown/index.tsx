import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import style from './style.module.scss';
import { MDXInjectComponents } from './inject-components';
type Props = {
  content: string;
};

export default function MDXRenderer(props: Props) {
  return (
    <article className={`${style['cgoing-markdown']} mb-40`}>
      <MDXRemote
        source={props.content}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [rehypePrettyCode, rehypeSlug],
          },
        }}
        components={MDXInjectComponents}
      />
    </article>
  );
}
