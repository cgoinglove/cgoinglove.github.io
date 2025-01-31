'use client';
import style from './backdrop-gradient.module.scss';

export default function BackdropGradient() {
  return (
    <div className={`${style.gradientBg}`}>
      <div className={style.gradientsContainer}>
        <div className={style.g1} />
        <div className={style.g2} />
        <div className={style.g3} />
        <div className={style.g4} />
        <div className={style.g5} />
      </div>
      <div className="fixed inset-0 bg-black/70 border-x w-full max-w-[1080px] mx-auto" />
    </div>
  );
}
