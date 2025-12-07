import React from 'react';
import clsx from 'clsx';

interface FadeWrapperProps {
  isHidden?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const FadeWrapper = ({
  isHidden,
  children,
  className = '',
}: FadeWrapperProps) => {
  return (
    <div
      className={clsx(
        'transition-[opacity,visibility] duration-250 ease-linear',
        isHidden ? '!invisible !opacity-0' : '!visible !opacity-100',
        className,
      )}
    >
      {children}
    </div>
  );
};
