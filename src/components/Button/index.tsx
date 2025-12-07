import { memo, MouseEvent } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  text: string;
  className?: string;
}

function Button({ onClick, disabled, text, className = '' }: ButtonProps) {
  const onClickAction = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) onClick(e);
  };

  return (
    <div
      className={clsx(
        'float-right p-[7px] text-center font-open-sans tracking-wider text-white uppercase transition-all duration-250 select-none',
        disabled
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
    prevProps.disabled === nextProps.disabled &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.text === nextProps.text,
);
