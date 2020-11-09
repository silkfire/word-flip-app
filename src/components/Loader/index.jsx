// https://loading.io/css/

import React, { memo } from 'react';

import styled, { keyframes } from 'styled-components';

const $Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  > div {
    background: ${({ $color }) => $color};
  }
`;

const $Element = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  /* background: #fff; */
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

const loader1 = keyframes`
  0% {
      transform: scale(0);
  }

  100% {
      transform: scale(1);
  }
`;

const loader2 = keyframes`
  0% {
      transform: translate(0, 0);
  }

  100% {
      transform: translate(24px, 0);
  }
`;

const loader3 = keyframes`
  0% {
      transform: scale(1);
  }

  100% {
      transform: scale(0);
  }
`;

const $Element1 = styled($Element)`
  left: 8px;
  animation: ${loader1} 0.6s infinite;
`;

const $Element2 = styled($Element)`
  left: 8px;
  animation: ${loader2} 0.6s infinite;
`;

const $Element3 = styled($Element)`
  left: 32px;
  animation: ${loader2} 0.6s infinite;
`;

const $Element4 = styled($Element)`
  left: 56px;
  animation: ${loader3} 0.6s infinite;
`;

function Loader({ color, className }) {
  return (
    <$Loader $color={color} className={className}>
        <$Element1 key="1"/>
        <$Element2 key="2"/>
        <$Element3 key="3"/>
        <$Element4 key="4"/>
    </$Loader>
  );
}

export default memo(Loader, () => true);
