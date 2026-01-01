"use client"

import { useState } from "react"
import { Coffee } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import CartItem from "./cart-item"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CartDrawerProps {
  t: any
  language: "en" | "es"
}

export default function CartDrawer({ t, language }: CartDrawerProps) {
  const { items, isOpen, closeCart, subtotal } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsCheckingOut(true)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          locale: language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.cart.checkoutError)
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(t.cart.checkoutError)
      setIsCheckingOut(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-space-mono-bold text-2xl">
            {t.cart.title}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <Coffee className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="font-space-mono text-lg text-muted-foreground mb-6">
              {t.cart.empty}
            </p>
            <button
              onClick={closeCart}
              className="px-6 py-3 bg-primary text-primary-foreground font-syne-mono text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition"
            >
              {t.cart.continueShopping}
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-0">
                {items.map((item) => (
                  <CartItem
                    key={`${item.productId}-${item.size}-${item.grindType}`}
                    item={item}
                    t={t}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Footer with Subtotal and Checkout */}
            <SheetFooter className="flex-col gap-4 border-t border-border pt-4 mt-4">
              <div className="flex items-center justify-between w-full">
                <span className="font-space-mono text-lg">
                  {t.cart.subtotal}
                </span>
                <span className="font-space-mono-bold text-2xl">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full px-6 py-4 bg-primary text-primary-foreground font-syne-mono text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? "Processing..." : t.cart.checkout}
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
