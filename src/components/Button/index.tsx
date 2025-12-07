import { memo, MouseEvent } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  isDisabled?: boolean;
  text: string;
  className?: string;
}

function Button({ onClick, isDisabled, text, className = '' }: ButtonProps) {
  const onClickAction = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDisabled) onClick(e);
  };

  return (
    <div
      className={clsx(
        'p-[7px] text-center font-open-sans tracking-wider text-white uppercase transition-all duration-250 select-none',
        isDisabled
          ? 'bg-gray-medium'
          : 'bg-red-coral hover:cursor-pointer hover:bg-red-dark',
        className,
      )}
      onClick={onClickAction}
    >
      {text}
    </div>
  );
}

export default memo(
  Button,
  (prevProps, nextProps) =>
    prevProps.isDisabled === nextProps.isDisabled &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.text === nextProps.text,
);
