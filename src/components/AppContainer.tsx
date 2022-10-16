import classNames from 'classnames';
import { ReactNode } from 'react';
interface Props {
  children?: ReactNode;
}

export default function AppContainer({ children }: Props) {
  return (
    <div
      id="appContainer"
      className={classNames('bg-base-100 pb-20 w-full min-h-screen')}
    >
      {children}
    </div>
  );
}
