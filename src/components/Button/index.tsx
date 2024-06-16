
import Spinner from '../Spinner';
import { Container } from './styles';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'link' | 'secondary',
  onClick?: (e?: any) => void,
  isLoading?: boolean,
  disabled?: boolean,
  fullWidth?: boolean,
  children?: React.ReactNode,
  className?: string,
}

export function Button({
  type = "button",
  isLoading = false,
  disabled = false,
  variant,
  fullWidth = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Container
      className={className || 'button-component'}
      type={type}
      $variant={variant}
      $isFullWidth={fullWidth}
      $isDisabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? <Spinner size={14} /> : children}
    </Container>
  )
}
