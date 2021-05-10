import { memo } from 'react';
import styled from 'styled-components';

const $ErrorMessage = styled.div`
  font-family: 'Varela Round', sans-serif;
  font-size: 0.9rem;
  color: #bf0000;
`;

function ErrorMessage({ message, className }) {
  return (
    <$ErrorMessage className={className}>{message}</$ErrorMessage>
  );
}

export default memo(ErrorMessage,
  (prevProps, nextProps) => prevProps.message === nextProps.message);
