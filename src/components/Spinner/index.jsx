import React, { memo } from 'react';
import styled from 'styled-components';

import bgImage from './spinner.svg';

const $Spinner = styled.div`
  background-image: url("${bgImage}");
  background-size: 45px;
  width: 45px;
  height: 45px;
`;

const Spinner = ({ className }) => <$Spinner className={className} />;

export default memo(Spinner, () => true);
