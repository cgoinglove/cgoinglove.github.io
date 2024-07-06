import Circle from '@components/common/circle';
import Icon from '@components/icon';
import GmailIcon from '@components/icon/g-mail';
import GitHubIcon from '@components/icon/git-hub';
import LinkedInIcon from '@components/icon/liked-in';
import PostCard from '@components/post/post-card';
import { PostManager } from '@lib/post-manager';

export default function Home() {
  return (
    <div className="flex flex-col relative mx-3">
      <section className="relative w-full flex flex-col md:flex-row md:items-center">
        <div className="h-full w-full md:w-1/3 flex p-8 justify-center">
          <div className="py-4 md:py-6 px-8 block rounded-lg hover:bg-white/10 ">
            <p className="text-xs mb-3 gap-1 flex items-center">
              <Icon type="hub" size={12} />
              Contect
            </p>
            <h1 className="text-white font-bold  text-lg  md:text-2xl">
              The Best Way to Get in Touch Is by Email.
            </h1>
          </div>
        </div>
        <div className="flex-1 relative md:border-l py-4 sm:py-10 sm:pb-32 md:py-40 ">
          <div
            className={`h-1/2 bg-clip-border translate-y-full w-[3px] absolute left-[-0.5px] md:left-[-1.5px] top-0 bg-gradient-to-b from-pink-600 to-rose-500`}
          />
          <div className="relative w-full h-full px-6 sm:px-14">
            <div className="relative sm:absolute flex items-center h-full sm:-left-5">
              <div className="sm:hidden bg-origin-border overflow-hidden rounded-tl-full absolute top-4 left-[-24.5px] border-t-[3px] border-l-[3px] h-full w-6 border-rose-500" />
              <ul
                role="list"
                className="flex mb-4 sm:flex-col items-center gap-2 ring px-2 sm:px-[11px] py-2 sm:py-4 rounded-full  bg-black/80 backdrop-blur-sm fill-white"
              >
                <li>
                  <a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile">
                    <LinkedInIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/cgoinglove"
                    className="fill-white"
                  >
                    <GitHubIcon />
                  </a>
                </li>
                <li>
                  <a href="mailto:neo.cgoing@gmail.com">
                    <GmailIcon />
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full h-full text-base md:text-xl relative">
              <span className=" font-medium text-white mr-1">Focusing</span>
              on implemented solutions and new technologies.
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-black from-40%" />
            </div>
          </div>
        </div>
      </section>
      <section
        id="posts"
        className="relative w-full flex flex-col md:flex-row md:items-center"
      >
        <div className="w-1/3 h-full hidden md:block p-8" />
        <div className="flex-1 relative">
          <div
            className={`w-[3px] absolute left-[-0.5px] inset-0 bg-gradient-to-b from-rose-500 to-indigo-500 h-1/2`}
          />
          <div
            className={`w-[5px] animate-pulse blur-lg -z-10 absolute left-[-1.5px] inset-0 bg-gradient-to-b from-rose-500 to-indigo-500 h-1/2`}
          />
          <div
            className={`top-1/2 w-[3px] absolute left-[-0.5px] inset-0 bg-gradient-to-b from-indigo-500 to-cyan-400 h-1/2`}
          />
          <div
            className={`top-1/2 w-[5px] animate-pulse blur-lg -z-10 absolute left-[-1.5px] inset-0 bg-gradient-to-b from-indigo-500 to-cyan-400 h-1/2`}
          />
          <ul role="list">
            {PostManager.getAll().map((post) => (
              <li
                key={post.slug}
                role="post"
                className="relative w-full h-full px-6 sm:px-14"
              >
                <div className="w-full flex flex-col pt-10 pb-20">
                  <div className="sm:absolute top-0 sm:top-[4.7rem] sm:-left-5 mb-2">
                    <Circle
                      className={`w-8 sm:w-10 h-8 sm:h-10 ring-1 bg-black/80 backdrop-blur-sm mr-6`}
                    >
                      <Icon size={18} type="container" />
                    </Circle>
                  </div>

                  <PostCard {...post} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
