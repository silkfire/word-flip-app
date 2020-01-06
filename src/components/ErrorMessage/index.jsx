import React, { memo } from 'react';

import './error-message.css';

function ErrorMessage({ message }) {
  return (
    <div styleName="default">{message}</div>
  );
}

export default memo(ErrorMessage,
  (prevProps, nextProps) => prevProps.message === nextProps.message);
