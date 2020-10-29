import styled from 'styled-components';

/* https://stackoverflow.com/a/6943704/633098 */

const $FadeWrapper = styled.div(({ $isHidden }) => ({
  transition: 'opacity 0.25s linear, visibility 0.25s linear !important',
  opacity: `${+!$isHidden} !important`,
  visibility: `${$isHidden ? 'hidden' : 'visible'} !important`,
}));

export { $FadeWrapper };
