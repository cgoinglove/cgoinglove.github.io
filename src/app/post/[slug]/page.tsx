import Image from 'next/image';
import { Metadata } from 'next';
import Header from '@components/header';
import { PostManager } from '@lib/post-manager';
import MDXRenderer from '@components/markdown';

export async function generateStaticParams() {
  if (process.env.NODE_ENV == 'development')
    return PostManager.getAll().flatMap((v) => [
      {
        slug: encodeURI(v.slug),
      },
      {
        slug: v.slug,
      },
    ]);

  return PostManager.getAll().map((v) => ({
    slug: decodeURIComponent(v.slug),
  }));
}

export async function generateMetadata(props: { params: { slug: string } }) {
  const hostname = 'https://cgoinglove.github.io';
  const { metadata, slug } = PostManager.getBySlug(props.params.slug)!;
  const description = `${slug.replace('-', ' ')} ${metadata.summary.slice(0, 20)}`;
  return {
    title: metadata.title,
    description,
    authors: 'cgoing',
    openGraph: {
      title: metadata.title,
      url: `${hostname}/post/${slug}`,
      description,
      type: 'article',
      images: [{ url: `${hostname}${metadata.thumbnail}` }],
      article: {
        publishedTime: metadata.timestamp,
        modifiedTime: metadata.timestamp,
        author: 'cgoing',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description,
      images: [{ url: `${hostname}${metadata.thumbnail}` }],
    },
  } as Metadata;
}

export default async function Page(props: { params: { slug: string } }) {
  const { metadata, content, slug } = PostManager.getBySlug(props.params.slug)!;

  return (
    <>
      <Header />
      <div className="flex flex-col relative">
        <div
          className="w-full absolute inset-0 z-10 h-24"
          style={{
            background:
              'linear-gradient(to top, transparent 50%,rgb(0 0 0)  100%)',
          }}
        />
        <Image
          src={metadata.thumbnail}
          alt="thumbnail"
          width={0}
          height={0}
          sizes="100vh"
          className="w-full h-[400px] object-cover absolute inset-0 "
          style={{
            maskImage:
              'linear-gradient(to top, transparent 15%,rgb(0 0 0)  100%)',
          }}
        />
        <div className="px-8 sm:px-24 w-full max-w-full xl:max-w-[1200px] lg:mx-auto pt-[300px]">
          <div className="flex justify-center">
            <h1 className="relative mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-zinc-300">
              {metadata.title}
              <time
                dateTime={new Date(metadata.timestamp).toString()}
                className="absolute left-0 -top-[100%] order-first ml-2 flex items-center text-base font-normal "
              >
                <span className="h-4 w-0.5 rounded-md bg-zinc-300"></span>
                <span className="ml-2 text-sm">{metadata.date}</span>
              </time>
            </h1>
          </div>

          <div className="my-16" style={{ color: '' }}>
            <MDXRenderer content={content} key={slug} />
          </div>
        </div>
      </div>
    </>
  );
}
