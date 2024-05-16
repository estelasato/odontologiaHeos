import { ComponentProps } from 'react'
import { Container } from './styles'

interface ErrorMessageProps extends ComponentProps<'div'> {
  error?: string
}

export function ErrorMessage({ error,...props }: ErrorMessageProps) {
  return (
    <Container {...props}>{error}</Container>
  )
}
