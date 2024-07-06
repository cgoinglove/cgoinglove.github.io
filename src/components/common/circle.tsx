import { HTMLAttributes } from 'react';

export default function Circle({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${className} rounded-full flex justify-center items-center`}
      {...rest}
    />
  );
}
