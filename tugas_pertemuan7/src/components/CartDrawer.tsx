import { useEffect, useRef, type FC, type ReactNode } from 'react'

export interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const CartDrawer: FC<CartDrawerProps> = ({ isOpen, onClose, children }) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    document.body.style.overflow = 'hidden'
    drawerRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) {
        event.preventDefault()
        drawerRef.current.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="cart-drawer-shell">
      <button
        type="button"
        className="cart-drawer-overlay"
        aria-label="Tutup keranjang"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        tabIndex={-1}
      >
        <div className="cart-drawer-grip" aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}

export default CartDrawer
