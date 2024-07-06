import { HTMLAttributes, Ref, forwardRef } from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

export default forwardRef<HTMLButtonElement, Props>(
  function Button(props, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className={`${props.className || ''} inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none font-semibold text-zinc-100 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-700 active:text-zinc-100/70 ml-4 flex-none`}
      />
    );
  }
);
