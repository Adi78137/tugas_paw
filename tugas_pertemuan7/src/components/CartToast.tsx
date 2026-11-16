import { useEffect, useRef, type FC } from 'react'
import Button from './Button'

export interface CartToastProps {
  message: string | null
  onDismiss: () => void
  onViewCart: () => void
}

const CartToast: FC<CartToastProps> = ({ message, onDismiss, onViewCart }) => {
  const onDismissRef = useRef(onDismiss)

  useEffect(() => {
    onDismissRef.current = onDismiss
  }, [onDismiss])

  useEffect(() => {
    if (!message) return
    const timeout = window.setTimeout(() => onDismissRef.current(), 2500)
    return () => window.clearTimeout(timeout)
  }, [message])

  if (!message) return null

  return (
    <div className="cart-toast">
      <span className="cart-toast-message" role="status" aria-live="polite">{message}</span>
      <Button
        variant="primary"
        size="sm"
        onClick={onViewCart}
        className="cart-toast-action text-nowrap px-3"
        ariaLabel="Buka keranjang belanja"
      >
        Lihat keranjang
      </Button>
    </div>
  )
}

export default CartToast
