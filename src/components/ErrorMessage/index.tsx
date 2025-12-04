import { memo } from 'react'
import styled from 'styled-components'

const $ErrorMessage = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-optical-sizing: auto;
  color: #d80000;
`

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <$ErrorMessage className={className}>{message}</$ErrorMessage>
  )
}

export default memo(ErrorMessage,
  (prevProps, nextProps) => prevProps.message === nextProps.message)
