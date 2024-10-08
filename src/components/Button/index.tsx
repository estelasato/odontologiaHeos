
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
  spaceLabel?: boolean,
}

export function Button({
  type = "button",
  isLoading = false,
  disabled = false,
  variant,
  fullWidth = false,
  children,
  className,
  spaceLabel,
  ...rest
}: ButtonProps) {
  return (
    <Container
      $spaceLabel={spaceLabel}
      className={className || 'button-component'}
      type={type}
      $variant={variant}
      $isFullWidth={fullWidth}
      $isDisabled={isLoading || disabled}
      {...rest}
    >
      {(isLoading && variant != 'link') ? <Spinner size={14} /> : children}
    </Container>
  )
}
