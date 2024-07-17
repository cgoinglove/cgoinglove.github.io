import { MDXRemote } from 'next-mdx-remote/rsc';

import style from './style.module.scss';
import { MDXInjectComponents } from './inject-components';
import { MDXOption } from './mdx-option';
type Props = {
  content: string;
};

export default function MDXRenderer(props: Props) {
  return (
    <article className={`${style['cgoing-markdown']} mb-40`}>
      <MDXRemote
        source={props.content}
        options={MDXOption}
        components={MDXInjectComponents}
      />
    </article>
  );
}
