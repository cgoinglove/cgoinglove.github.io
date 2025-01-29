'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type State = {
  lastScroll: number;
  top: number;
};

const Height = 64;

export default function Header() {
  const router = useRouter();

  const [state, setState] = useState<State>({
    lastScroll: 0,
    top: 0,
  });

  useEffect(() => {
    const handler = () => {
      setState((prev) => {
        const weight = prev.lastScroll - window.scrollY;
        return {
          lastScroll: window.scrollY,
          top: Math.min(Math.max(prev.top + weight, -Height), 0),
        };
      });
    };
    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className="inset-0 mx-auto pointer-events-none fixed z-50 flex flex-none flex-col h-[158px] mb-[-105px] max-w-[1080px] w-full">
      <div
        className={`z-10 w-full h-[${Height}px] pt-6 relative `}
        style={{
          top: `${state.top}px`,
        }}
      >
        <div className="sm:px-8 w-full">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="relative flex gap-4">
                  <div className="flex flex-1 justify-start">
                    <div
                      className="pointer-events-auto"
                      data-headlessui-state=""
                    >
                      <button
                        className="group flex items-center rounded-full  px-4 py-2 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-850/10 text-zinc-200 ring-white/10 hover:ring-white/20"
                        type="button"
                        onClick={() => router.push('/')}
                      >
                        <svg
                          viewBox="0 0 8 6"
                          className="h-auto mr-2 w-3 stroke-zinc-300 group-hover:stroke-zinc-200 rotate-90"
                        >
                          <path
                            d="M1.75 1.75 4 4.25l2.25-2.5"
                            fill="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
