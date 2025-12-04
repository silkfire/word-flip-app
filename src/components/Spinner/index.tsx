import { memo } from 'react'
import styled from 'styled-components'

import bgImage from './spinner.svg'

const $Spinner = styled.div`
  background-image: url("${bgImage}");
  background-size: 45px;
  width: 45px;
  height: 45px;
`

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => <$Spinner className={className} />

export default memo(Spinner, () => true)
