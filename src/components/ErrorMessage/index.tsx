import { memo } from 'react';

interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="font-inter text-sm text-red-crimson">{message}</div>;
}

export default memo(
  ErrorMessage,
  (prevProps, nextProps) => prevProps.message === nextProps.message,
);
