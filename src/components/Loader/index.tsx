// https://loading.io/css/

import { memo } from 'react';
import clsx from 'clsx';

interface LoaderProps {
  color?: string;
  className?: string;
}

function Loader({ color, className = '' }: LoaderProps) {
  const elementClass = clsx(
    'absolute top-[33px] w-[13px] h-[13px] rounded-full',
    '[animation-timing-function:cubic-bezier(0,1,1,0)]',
  );
  const style = { background: color };

  return (
    <div className={clsx('relative inline-block h-[80px] w-[80px]', className)}>
      <div
        className={clsx(elementClass, 'left-[8px] animate-loader1')}
        style={style}
        key="1"
      />
      <div
        className={clsx(elementClass, 'left-[8px] animate-loader2')}
        style={style}
        key="2"
      />
      <div
        className={clsx(elementClass, 'left-[32px] animate-loader2')}
        style={style}
        key="3"
      />
      <div
        className={clsx(elementClass, 'left-[56px] animate-loader3')}
        style={style}
        key="4"
      />
    </div>
  );
}

export default memo(Loader, () => true);
