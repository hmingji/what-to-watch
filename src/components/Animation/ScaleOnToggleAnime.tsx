import classNames from 'classnames';
import { ReactNode, useRef } from 'react';
import { useHover } from 'usehooks-ts';

interface Props {
  children: ReactNode;
  className?: string;
  onScaleDownEnd: () => void;
}

export default function ScaleOnToggleAnime({
  children,
  className,
  onScaleDownEnd,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isHover = useHover(ref);
  const classNameWithAnimeEffect = classNames(
    className,
    isHover ? 'scale-125' : 'scale-100',
    'transition-all duration-150 ease-in-out'
  );

  return (
    <div
      ref={ref}
      className={classNameWithAnimeEffect}
      onTransitionEnd={() => {
        if (!isHover) onScaleDownEnd();
      }}
    >
      {children}
    </div>
  );
}
