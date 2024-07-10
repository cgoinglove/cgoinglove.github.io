import Icon from '@components/icon';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ metadata, slug }: Post) {
  return (
    <Link
      href={`/post/${slug}`}
      key={slug}
      className="group flex flex-col cursor-pointer mb-20 hover:translate-y-1 transition-transform"
    >
      <header className="mr-0 md:mr-12 text-sm">
        <div className="flex items-center text-zinc-500 w-full">
          <h5 className="py-2 mr-2 text-xs">
            {dayjs(metadata.date).format('MMMM D, YYYY')}
          </h5>
        </div>
        <h1 className="text-2xl text-zinc-50 font-bold mt-1 mb-4 lg:mb-6 w-full ">
          {metadata.title}
        </h1>
      </header>
      <figure className="ring-1 max-w-[700px] lg:w-[120%]  cursor-pointer relative flex flex-col lg:flex-row-reverse rounded-lg overflow-hidden transition-colors group bg-zinc-900/50 lg:-translate-x-20 backdrop-blur-sm group-hover:bg-black/40">
        <figcaption className="flex items-end pt-0 lg:pt-8 pr-0 lg:pr-8 mx-0 lg:mx-auto">
          <div className="shadow-2xl sm:shadow-md shadow-black lg:h-[190px] lg:w-[220px] h-[240px] w-full group-hover:translate-y-0 lg:group-hover:translate-y-2 transition-transform">
            <Image
              alt={`${metadata.title} thumbnail`}
              width={1000}
              height={1000}
              className="ring-1 object-cover w-full h-full rounded-xl rounded-b-none"
              src={metadata.thumbnail}
            />
          </div>
        </figcaption>
        <div className="flex flex-col p-8 justify-between">
          <blockquote className="my-4">
            <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors text-ellipsis">
              {metadata.summary}
            </p>
          </blockquote>

          <div className="flex">
            <button className="flex items-center rounded-3xl py-2 font-semibold text-zinc-400 group-hover:text-zinc-50 transition-colors">
              Read More
              <Icon type="arrow" className="ml-1" size={18} />
            </button>
          </div>
        </div>
      </figure>
    </Link>
  );
}
