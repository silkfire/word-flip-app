import React, { memo } from 'react';
import styled from 'styled-components';

const $Button = styled.div`
  font-family: 'Open Sans', sans-serif;

  background-color: #f2625a;
  transition: all 0.25s;
  text-align: center;
  color: #fff;
  padding: 7px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  float: right;

  ${({ $disabled }) => (!$disabled && `
    &:hover {
      background-color: #dd483f;
      cursor: pointer;
    }
  `) || 'background-color: #c3c3c3;'}
`;

function Button({
  onClick, disabled, text, className,
}) {
  const onClickAction = (e) => {
    if (!disabled) onClick(e);
  };

  return (
    <$Button $disabled={disabled} onClick={onClickAction} className={className}>{text}</$Button>
  );
}

export default memo(Button, (prevProps, nextProps) => prevProps.disabled === nextProps.disabled
                                                   && prevProps.onClick === nextProps.onClick
                                                   && prevProps.text === nextProps.text);
