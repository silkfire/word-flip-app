// https://loading.io/css/

import React, { memo } from 'react';

import './loader.css';

function Loader({ color }) {
  const elements = [];

  for (let i = 0; i < 4; i += 1) elements.push(<div key={i} style={{ background: color }}></div>);

  return (
    <div styleName="loader">
        {elements}
    </div>
  );
}

export default memo(Loader, () => true);
