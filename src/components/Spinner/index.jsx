import React, { memo } from 'react';

// eslint-disable-next-line no-unused-vars
import './spinner.css';

function Spinner() {
  return (
    <div styleName="spinner"></div>
  );
}


export default memo(Spinner, () => true);
