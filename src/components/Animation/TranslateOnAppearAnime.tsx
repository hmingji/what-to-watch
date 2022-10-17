import classNames from 'classnames';
import { ReactNode, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function TranslateOnAppearAnime({ children, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const classNameWithAnimeEffect = classNames(
    className,
    entry?.isIntersecting
      ? 'translate-y-0 opacity-100'
      : 'translate-y-6 opacity-20',
    'transition-all duration-300 ease-in-out'
  );

  return (
    <div
      ref={ref}
      className={classNameWithAnimeEffect}
    >
      {children}
    </div>
  );
}
