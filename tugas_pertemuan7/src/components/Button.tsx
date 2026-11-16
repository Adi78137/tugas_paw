import React from 'react'

export interface ButtonProps {
  variant?: 'primary' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  href?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  onClick,
  children,
  type = 'button',
  ariaLabel,
  href,
  disabled = false,
  className = '',
  style,
}) => {
  const variantClass =
    variant === 'primary'
      ? 'btn-coffee-primary'
      : variant === 'outline'
      ? 'btn-outline-coffee'
      : variant === 'danger'
      ? 'btn-outline-danger'
      : 'btn-outline-success'

  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''
  const combinedClasses = `btn ${variantClass} ${sizeClass} ${className}`.trim()

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        style={style}
        role="button"
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
