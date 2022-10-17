import classNames from 'classnames';
import { ReactNode, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ColorChangeBackground({ children, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const classNameWithAnimeEffect = classNames(
    className,
    entry?.isIntersecting ? 'bg-black' : 'bg-gradient-to-t from-black',
    'transition-all duration-1000 ease-in-out'
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
