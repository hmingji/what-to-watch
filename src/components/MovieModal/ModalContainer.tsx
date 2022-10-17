import { ReactNode } from 'react';
import { useAppSelector } from '../../store/configureStore';

interface Props {
  children: ReactNode;
}
export default function ModalContainer({ children }: Props) {
  const { isDetailActivated, hoveredCardLeft, hoveredCardTop } = useAppSelector(
    (state) => state.app
  );

  if (isDetailActivated)
    return (
      <div
        className="z-50 absolute w-full min-h-screen bg-black bg-opacity-60 overflow-auto"
        style={{
          top: `0px`,
          left: `0px`,
        }}
      >
        {children}
      </div>
    );

  return (
    <div
      className="z-50 absolute"
      style={{
        top: `${hoveredCardTop}px`,
        left: `${hoveredCardLeft}px`,
      }}
    >
      {children}
    </div>
  );
}
