import { memo } from 'react';
import clsx from 'clsx';

import bgImage from './spinner.svg';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = '' }: SpinnerProps) => (
  <div
    className={clsx('h-[45px] w-[45px] bg-[length:45px]', className)}
    style={{ backgroundImage: `url("${bgImage}")` }}
  />
);

export default memo(Spinner, () => true);
