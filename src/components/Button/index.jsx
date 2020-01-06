import React, { memo } from 'react';
import classNames from 'classnames';

import './button.css';

function Button({
  onClick, disabled, style, text,
}) {
  const onClickAction = (e) => {
    if (!disabled) onClick(e);
  };

  return (
    <div styleName={classNames('default', { disabled })} style={style} onClick={onClickAction}>{text}</div>
  );
}

export default memo(Button, (prevProps, nextProps) => prevProps.disabled === nextProps.disabled
                                                   && prevProps.onClick === nextProps.onClick
                                                   && prevProps.text === nextProps.text);
